const { test } = require('node:test');
const assert = require('node:assert/strict');
const { byCrawlApiPagination } = require('../dist/nodes/ByCrawl/GenericFunctions.js');
const { ByCrawl } = require('../dist/nodes/ByCrawl/ByCrawl.node.js');
const { ByCrawlApi } = require('../dist/credentials/ByCrawlApi.credentials.js');

test('Threads user posts has no automatic pagination or inert count controls', () => {
  const properties = new ByCrawl().description.properties;
  const operation = properties.find(p => p.name === 'operation' && p.displayOptions?.show?.resource?.includes('threads')).options.find(o => o.value === 'getUserPosts');
  assert.equal(operation.routing.send?.paginate, undefined);
  assert.equal(operation.routing.output.postReceive[0].properties.property, 'posts');
  for (const name of ['returnAll', 'limit']) {
    assert.deepEqual(properties.find(p => p.name === name).displayOptions.hide, { resource: ['threads'], operation: ['getUserPosts'] });
  }
  assert.equal(properties.some(p => p.name === 'additionalFields' && p.displayOptions?.show?.resource?.includes('threads') && p.displayOptions?.show?.operation?.includes('getUserPosts')), false);
});

async function paginate(pages, { returnAll = true, limit = 50 } = {}) {
  const cursors = [];
  const result = await byCrawlApiPagination.call({
    getNodeParameter: name => ({ returnAll, limit })[name],
    makeRoutingRequest: async request => {
      cursors.push(request.options.qs.cursor);
      assert.equal(request.options.qs.q, 'fixture');
      if (!pages.length) throw new Error('Unexpected extra page request');
      const page = pages.shift();
      if (page instanceof Error) throw page;
      return page;
    },
  }, { options: { qs: { q: 'fixture' } } });
  return { result, cursors };
}

test('compiled pagination preserves query params and supports cursor envelopes', async () => {
  for (const envelope of [{ cursor: 'next', hasMore: true }, { nextCursor: 'next' }, { pageInfo: { endCursor: 'next', hasNextPage: true } }]) {
    const first = { json: { id: 1, ...envelope } };
    const last = { json: { id: 2 } };
    assert.deepEqual(await paginate([[first], [last]]), { result: [first, last], cursors: [undefined, 'next'] });
  }
});
test('pagination respects limits, empty pages and provider failures', async () => {
  const items = [{ json: { id: 1 } }, { json: { id: 2, cursor: 'next' } }];
  assert.deepEqual((await paginate([items], { returnAll: false, limit: 1 })).result, [items[0]]);
  assert.deepEqual((await paginate([[]])).result, []);
  await assert.rejects(paginate([new Error('provider unavailable')]), /provider unavailable/);
});
test('terminal and repeated cursors stop without issuing unbounded requests', async () => {
  for (const end of [{ cursor: 'next', hasMore: false }, { pageInfo: { endCursor: 'next', hasNextPage: false } }]) {
    assert.equal((await paginate([[{ json: end }]])).cursors.length, 1);
  }
  assert.equal((await paginate([[{ json: { cursor: 'same' } }], [{ json: { cursor: 'same' } }]])).cursors.length, 2);
});
test('resource and operation IDs remain unambiguous in the compiled node', () => {
  const properties = new ByCrawl().description.properties;
  const resources = properties.find(p => p.name === 'resource').options.map(o => o.value);
  assert.equal(new Set(resources).size, resources.length);
  const operations = properties.filter(p => p.name === 'operation');
  for (const resource of resources) {
    const definitions = operations.filter(p => p.displayOptions.show.resource.includes(resource));
    assert.equal(definitions.length, 1, resource);
    const ids = definitions[0].options.map(o => o.value);
    assert.equal(new Set(ids).size, ids.length, resource);
    assert.ok(ids.includes(definitions[0].default), resource);
  }
});
test('Threads search sends current wire names and does not invent pagination', () => {
  const properties = new ByCrawl().description.properties;
  const operations = properties.find(p => p.name === 'operation' && p.displayOptions.show.resource.includes('threads'));
  const search = operations.options.find(o => o.value === 'searchPosts');
  assert.equal(search.routing.request.method, 'GET');
  assert.equal(search.routing.request.url, '/threads/posts/search');
  assert.equal(search.routing.request.qs.q, '={{$parameter["query"]}}');
  assert.ok(!search.routing.send?.paginate);
  assert.equal(search.routing.output.postReceive[0].properties.property, 'posts');
  const options = properties.find(p => p.name === 'searchOptions' && p.displayOptions.show.resource.includes('threads')).options;
  for (const [name, wire] of [['searchType', 'search_type'], ['count', 'count'], ['since', 'since'], ['until', 'until']]) {
    const field = options.find(p => p.name === name);
    assert.equal(field.routing.request.qs[wire], '={{$value}}');
  }
});
test('credentials stay in the authenticated header', () => {
  const credentials = new ByCrawlApi();
  assert.equal(credentials.authenticate.properties.headers['x-api-key'], '={{$credentials.apiKey}}');
  assert.equal(credentials.properties.find(p => p.name === 'apiKey').typeOptions.password, true);
});
