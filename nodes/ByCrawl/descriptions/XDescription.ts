import { INodeProperties } from 'n8n-workflow';

export const xOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: { resource: ['x'] },
    },
    options: [
      {
        name: 'Get User',
        value: 'getUser',
        description: 'Get an X/Twitter user profile',
        action: 'Get an X/Twitter user profile',
        routing: {
          request: {
            method: 'GET',
            url: '=/x/users/{{$parameter["username"]}}',
          },
        },
      },
      {
        name: 'Get User Posts',
        value: 'getUserPosts',
        description: 'Get posts by an X/Twitter user',
        action: 'Get posts by an X/Twitter user',
        routing: {
          request: {
            method: 'GET',
            url: '=/x/users/{{$parameter["username"]}}/posts',
          },
          send: { paginate: true },
          output: {
            postReceive: [
              {
                type: 'rootProperty',
                properties: {
                  property: 'tweets',
                },
              },
            ],
          },
        },
      },
      {
        name: 'Get Post',
        value: 'getPost',
        description: 'Get a single X/Twitter post',
        action: 'Get an X/Twitter post',
        routing: {
          request: {
            method: 'GET',
            url: '=/x/posts/{{$parameter["postId"]}}',
          },
        },
      },
      {
        name: 'Search Posts',
        value: 'searchPosts',
        description: 'Search X/Twitter posts',
        action: 'Search X/Twitter posts',
        routing: {
          request: {
            method: 'GET',
            url: '/x/posts/search',
            qs: {
              q: '={{$parameter["query"]}}',
            },
          },
          send: { paginate: true },
          output: {
            postReceive: [
              {
                type: 'rootProperty',
                properties: {
                  property: 'tweets',
                },
              },
            ],
          },
        },
      },
    ],
    default: 'getUser',
  },
];

export const xFields: INodeProperties[] = [
  {
    displayName: 'Username',
    name: 'username',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['x'],
        operation: ['getUser', 'getUserPosts'],
      },
    },
    description: 'The X/Twitter username (without @)',
  },
  {
    displayName: 'Post ID',
    name: 'postId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['x'],
        operation: ['getPost'],
      },
    },
    description: 'The numeric tweet ID',
  },
  {
    displayName: 'Query',
    name: 'query',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['x'],
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
        resource: ['x'],
        operation: ['getUserPosts'],
      },
    },
    options: [
      {
        displayName: 'Count',
        name: 'count',
        type: 'number',
        typeOptions: { minValue: 1, maxValue: 40 },
        default: 20,
        description: 'Number of results to return (max 40)',
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
        resource: ['x'],
        operation: ['searchPosts'],
      },
    },
    options: [
      {
        displayName: 'Count',
        name: 'count',
        type: 'number',
        typeOptions: { minValue: 1, maxValue: 15 },
        default: 15,
        description: 'Number of results to return (max 15)',
        routing: {
          request: {
            qs: { count: '={{$value}}' },
          },
        },
      },
      {
        displayName: 'Product',
        name: 'product',
        type: 'options',
        options: [
          { name: 'Top', value: 'Top' },
          { name: 'Latest', value: 'Latest' },
        ],
        default: 'Top',
        routing: {
          request: {
            qs: { product: '={{$value}}' },
          },
        },
      },
    ],
  },
];
