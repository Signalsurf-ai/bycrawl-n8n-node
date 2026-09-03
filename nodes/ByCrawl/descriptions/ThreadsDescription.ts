import { INodeProperties } from 'n8n-workflow';

export const threadsOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: { resource: ['threads'] },
    },
    options: [
      {
        name: 'Get User',
        value: 'getUser',
        description: 'Get a Threads user profile',
        action: 'Get a Threads user profile',
        routing: {
          request: {
            method: 'GET',
            url: '=/threads/users/{{$parameter["username"]}}',
          },
        },
      },
      {
        name: 'Get User Posts',
        value: 'getUserPosts',
        description: 'Get posts by a Threads user',
        action: 'Get posts by a Threads user',
        routing: {
          request: {
            method: 'GET',
            url: '=/threads/users/{{$parameter["username"]}}/posts',
          },
          send: { paginate: true },
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
        name: 'Get User Replies',
        value: 'getUserReplies',
        description: 'Get replies by a Threads user',
        action: 'Get replies by a Threads user',
        routing: {
          request: {
            method: 'GET',
            url: '=/threads/users/{{$parameter["username"]}}/replies',
          },
          send: { paginate: true },
          output: {
            postReceive: [
              {
                type: 'rootProperty',
                properties: {
                  property: 'replies',
                },
              },
            ],
          },
        },
      },
      {
        name: 'Get Post',
        value: 'getPost',
        description: 'Get a single Threads post by ID',
        action: 'Get a Threads post',
        routing: {
          request: {
            method: 'GET',
            url: '=/threads/posts/{{$parameter["postId"]}}',
          },
        },
      },
      {
        name: 'Get Many Posts',
        value: 'getManyPosts',
        description: 'Get multiple Threads posts by IDs',
        action: 'Get multiple Threads posts',
        routing: {
          request: {
            method: 'GET',
            url: '/threads/posts',
            qs: {
              ids: '={{$parameter["postIds"]}}',
            },
          },
        },
      },
      {
        name: 'Search Posts',
        value: 'searchPosts',
        description: 'Search Threads posts by keyword',
        action: 'Search Threads posts',
        routing: {
          request: {
            method: 'GET',
            url: '/threads/posts/search',
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
                  property: 'posts',
                },
              },
            ],
          },
        },
      },
      {
        name: 'Search Users',
        value: 'searchUsers',
        description: 'Search Threads users by keyword',
        action: 'Search Threads users',
        routing: {
          request: {
            method: 'GET',
            url: '/threads/users/search',
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
                  property: 'users',
                },
              },
            ],
          },
        },
      },
      {
        name: 'Get Public Feed',
        value: 'getPublicFeed',
        description: 'Get the Threads public feed',
        action: 'Get the Threads public feed',
        routing: {
          request: {
            method: 'GET',
            url: '/threads/feed/public',
          },
          send: { paginate: true },
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
    default: 'getUser',
  },
];

export const threadsFields: INodeProperties[] = [
  {
    displayName: 'Username',
    name: 'username',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['threads'],
        operation: ['getUser', 'getUserPosts', 'getUserReplies'],
      },
    },
    description: 'The Threads username (without @)',
  },
  {
    displayName: 'Post ID',
    name: 'postId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['threads'],
        operation: ['getPost'],
      },
    },
    description: 'The Threads post ID',
  },
  {
    displayName: 'Post IDs',
    name: 'postIds',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['threads'],
        operation: ['getManyPosts'],
      },
    },
    description: 'Comma-separated list of Threads post IDs',
  },
  {
    displayName: 'Query',
    name: 'query',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['threads'],
        operation: ['searchPosts', 'searchUsers'],
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
        resource: ['threads'],
        operation: ['getUserPosts', 'getUserReplies'],
      },
    },
    options: [
      {
        displayName: 'Count',
        name: 'count',
        type: 'number',
        typeOptions: { minValue: 1 },
        default: 10,
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
        resource: ['threads'],
        operation: ['getPost', 'getManyPosts'],
      },
    },
    options: [
      {
        displayName: 'Mode',
        name: 'mode',
        type: 'options',
        options: [
          { name: 'Default', value: 'default' },
          { name: 'Full', value: 'full' },
        ],
        default: 'default',
        description: 'Use "full" for more detailed post data (costs more credits)',
        routing: {
          request: {
            qs: { mode: '={{$value}}' },
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
        resource: ['threads'],
        operation: ['getPublicFeed'],
      },
    },
    options: [
      {
        displayName: 'Country',
        name: 'country',
        type: 'string',
        default: 'TW',
        description: 'Country code for the feed (e.g., TW, US, JP)',
        routing: {
          request: {
            qs: { country: '={{$value}}' },
          },
        },
      },
    ],
  },
];
