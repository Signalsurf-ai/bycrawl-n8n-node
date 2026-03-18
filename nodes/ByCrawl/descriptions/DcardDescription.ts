import { INodeProperties } from 'n8n-workflow';

export const dcardOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: { resource: ['dcard'] },
    },
    options: [
      {
        name: 'Get Forum',
        value: 'getForum',
        description: 'Get Dcard forum info',
        action: 'Get Dcard forum info',
        routing: {
          request: {
            method: 'GET',
            url: '=/dcard/forums/{{$parameter["forumAlias"]}}',
            timeout: 120000,
          },
        },
      },
      {
        name: 'Get Forum Posts',
        value: 'getForumPosts',
        description: 'Get posts from a Dcard forum',
        action: 'Get posts from a Dcard forum',
        routing: {
          request: {
            method: 'GET',
            url: '=/dcard/forums/{{$parameter["forumAlias"]}}/posts',
            timeout: 120000,
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
        name: 'Get Persona',
        value: 'getPersona',
        description: 'Get a Dcard persona',
        action: 'Get a Dcard persona',
        routing: {
          request: {
            method: 'GET',
            url: '=/dcard/personas/{{$parameter["uid"]}}',
            timeout: 120000,
          },
        },
      },
      {
        name: 'Search Posts',
        value: 'searchPosts',
        description: 'Search Dcard posts',
        action: 'Search Dcard posts',
        routing: {
          request: {
            method: 'GET',
            url: '/dcard/posts/search',
            qs: {
              q: '={{$parameter["query"]}}',
            },
            timeout: 120000,
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
    default: 'getForum',
  },
];

export const dcardFields: INodeProperties[] = [
  {
    displayName: 'Forum Alias',
    name: 'forumAlias',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['dcard'],
        operation: ['getForum', 'getForumPosts'],
      },
    },
    description: 'Forum alias (e.g., trending, talk, relationship)',
  },
  {
    displayName: 'UID',
    name: 'uid',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['dcard'],
        operation: ['getPersona'],
      },
    },
    description: 'User persona UID',
  },
  {
    displayName: 'Query',
    name: 'query',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['dcard'],
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
        resource: ['dcard'],
        operation: ['getForumPosts'],
      },
    },
    options: [
      {
        displayName: 'Count',
        name: 'count',
        type: 'number',
        typeOptions: { minValue: 1, maxValue: 30 },
        default: 30,
        description: 'Number of posts to return (max 30)',
        routing: {
          request: {
            qs: { count: '={{$value}}' },
          },
        },
      },
      {
        displayName: 'Popular',
        name: 'popular',
        type: 'boolean',
        default: false,
        description: 'Whether to show popular posts only',
        routing: {
          request: {
            qs: { popular: '={{$value}}' },
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
        resource: ['dcard'],
        operation: ['searchPosts'],
      },
    },
    options: [
      {
        displayName: 'Limit',
        name: 'limit',
        type: 'number',
        typeOptions: { minValue: 1, maxValue: 100 },
        default: 30,
        description: 'Number of results to return (max 100)',
        routing: {
          request: {
            qs: { limit: '={{$value}}' },
          },
        },
      },
      {
        displayName: 'Offset',
        name: 'offset',
        type: 'number',
        typeOptions: { minValue: 0 },
        default: 0,
        description: 'Number of results to skip',
        routing: {
          request: {
            qs: { offset: '={{$value}}' },
          },
        },
      },
    ],
  },
];
