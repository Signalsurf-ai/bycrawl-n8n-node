import { INodeProperties } from 'n8n-workflow';

export const redditOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: { resource: ['reddit'] },
    },
    options: [
      {
        name: 'Get Subreddit',
        value: 'getSubreddit',
        description: 'Get subreddit info',
        action: 'Get subreddit info',
        routing: {
          request: {
            method: 'GET',
            url: '=/reddit/subreddits/{{$parameter["subredditName"]}}',
          },
        },
      },
      {
        name: 'Get Subreddit Posts',
        value: 'getSubredditPosts',
        description: 'Get posts from a subreddit',
        action: 'Get posts from a subreddit',
        routing: {
          request: {
            method: 'GET',
            url: '=/reddit/subreddits/{{$parameter["subredditName"]}}/posts',
          },
          output: {
            postReceive: [
              {
                type: 'rootProperty',
                properties: {
                  property: 'posts',
                },
              },
            ],
          },
        },
      },
      {
        name: 'Get User',
        value: 'getUser',
        description: 'Get a Reddit user profile',
        action: 'Get a Reddit user profile',
        routing: {
          request: {
            method: 'GET',
            url: '=/reddit/users/{{$parameter["username"]}}',
          },
        },
      },
      {
        name: 'Get User Posts',
        value: 'getUserPosts',
        description: 'Get posts by a Reddit user',
        action: 'Get posts by a Reddit user',
        routing: {
          request: {
            method: 'GET',
            url: '=/reddit/users/{{$parameter["username"]}}/posts',
          },
          output: {
            postReceive: [
              {
                type: 'rootProperty',
                properties: {
                  property: 'posts',
                },
              },
            ],
          },
        },
      },
      {
        name: 'Get Post',
        value: 'getPost',
        description: 'Get a single Reddit post',
        action: 'Get a Reddit post',
        routing: {
          request: {
            method: 'GET',
            url: '=/reddit/posts/{{$parameter["postId"]}}',
          },
        },
      },
      {
        name: 'Search Posts',
        value: 'searchPosts',
        description: 'Search Reddit posts',
        action: 'Search Reddit posts',
        routing: {
          request: {
            method: 'GET',
            url: '/reddit/posts/search',
            qs: {
              q: '={{$parameter["query"]}}',
            },
          },
          output: {
            postReceive: [
              {
                type: 'rootProperty',
                properties: {
                  property: 'posts',
                },
              },
            ],
          },
        },
      },
    ],
    default: 'getSubreddit',
  },
];

export const redditFields: INodeProperties[] = [
  {
    displayName: 'Subreddit Name',
    name: 'subredditName',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['reddit'],
        operation: ['getSubreddit', 'getSubredditPosts'],
      },
    },
    description: 'Subreddit name (without r/)',
  },
  {
    displayName: 'Username',
    name: 'username',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['reddit'],
        operation: ['getUser', 'getUserPosts'],
      },
    },
    description: 'The Reddit username',
  },
  {
    displayName: 'Post ID',
    name: 'postId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['reddit'],
        operation: ['getPost'],
      },
    },
    description: 'The Reddit post ID',
  },
  {
    displayName: 'Query',
    name: 'query',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['reddit'],
        operation: ['searchPosts'],
      },
    },
    description: 'Search keyword',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['reddit'],
        operation: ['getSubredditPosts'],
      },
    },
    options: [
      {
        displayName: 'Sort',
        name: 'sort',
        type: 'options',
        options: [
          { name: 'Hot', value: 'hot' },
          { name: 'New', value: 'new' },
          { name: 'Top', value: 'top' },
          { name: 'Rising', value: 'rising' },
        ],
        default: 'hot',
        routing: {
          request: {
            qs: { sort: '={{$value}}' },
          },
        },
      },
      {
        displayName: 'Time Filter',
        name: 't',
        type: 'options',
        options: [
          { name: 'Hour', value: 'hour' },
          { name: 'Day', value: 'day' },
          { name: 'Week', value: 'week' },
          { name: 'Month', value: 'month' },
          { name: 'Year', value: 'year' },
          { name: 'All', value: 'all' },
        ],
        default: 'all',
        routing: {
          request: {
            qs: { t: '={{$value}}' },
          },
        },
      },
      {
        displayName: 'Count',
        name: 'count',
        type: 'number',
        typeOptions: { minValue: 1, maxValue: 100 },
        default: 25,
        description: 'Number of results to return',
        routing: {
          request: {
            qs: { count: '={{$value}}' },
          },
        },
      },
    ],
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['reddit'],
        operation: ['getUserPosts'],
      },
    },
    options: [
      {
        displayName: 'Sort',
        name: 'sort',
        type: 'options',
        options: [
          { name: 'New', value: 'new' },
          { name: 'Hot', value: 'hot' },
          { name: 'Top', value: 'top' },
        ],
        default: 'new',
        routing: {
          request: {
            qs: { sort: '={{$value}}' },
          },
        },
      },
      {
        displayName: 'Time Filter',
        name: 't',
        type: 'options',
        options: [
          { name: 'Hour', value: 'hour' },
          { name: 'Day', value: 'day' },
          { name: 'Week', value: 'week' },
          { name: 'Month', value: 'month' },
          { name: 'Year', value: 'year' },
          { name: 'All', value: 'all' },
        ],
        default: 'all',
        routing: {
          request: {
            qs: { t: '={{$value}}' },
          },
        },
      },
      {
        displayName: 'Count',
        name: 'count',
        type: 'number',
        typeOptions: { minValue: 1, maxValue: 100 },
        default: 25,
        description: 'Number of results to return',
        routing: {
          request: {
            qs: { count: '={{$value}}' },
          },
        },
      },
    ],
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['reddit'],
        operation: ['searchPosts'],
      },
    },
    options: [
      {
        displayName: 'Sort',
        name: 'sort',
        type: 'options',
        options: [
          { name: 'Relevance', value: 'relevance' },
          { name: 'Hot', value: 'hot' },
          { name: 'Top', value: 'top' },
          { name: 'New', value: 'new' },
          { name: 'Comments', value: 'comments' },
        ],
        default: 'relevance',
        routing: {
          request: {
            qs: { sort: '={{$value}}' },
          },
        },
      },
      {
        displayName: 'Time Filter',
        name: 't',
        type: 'options',
        options: [
          { name: 'Hour', value: 'hour' },
          { name: 'Day', value: 'day' },
          { name: 'Week', value: 'week' },
          { name: 'Month', value: 'month' },
          { name: 'Year', value: 'year' },
          { name: 'All', value: 'all' },
        ],
        default: 'all',
        routing: {
          request: {
            qs: { t: '={{$value}}' },
          },
        },
      },
      {
        displayName: 'Count',
        name: 'count',
        type: 'number',
        typeOptions: { minValue: 1, maxValue: 100 },
        default: 25,
        description: 'Number of results to return',
        routing: {
          request: {
            qs: { count: '={{$value}}' },
          },
        },
      },
    ],
  },
];
