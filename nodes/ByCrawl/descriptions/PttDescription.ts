import { INodeProperties } from 'n8n-workflow';

export const pttOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: { resource: ['ptt'] },
    },
    options: [
      {
        name: 'Get Board',
        value: 'getBoard',
        description: 'Get PTT board info',
        action: 'Get PTT board info',
        routing: {
          request: {
            method: 'GET',
            url: '=/ptt/boards/{{$parameter["boardName"]}}',
          },
        },
      },
      {
        name: 'Get Board Posts',
        value: 'getBoardPosts',
        description: 'List posts from a PTT board',
        action: 'List posts from a PTT board',
        routing: {
          request: {
            method: 'GET',
            url: '=/ptt/boards/{{$parameter["boardName"]}}/posts',
          },
        },
      },
      {
        name: 'Get Post',
        value: 'getPost',
        description: 'Get a single PTT post with pushes',
        action: 'Get a single PTT post with pushes',
        routing: {
          request: {
            method: 'GET',
            url: '/ptt/posts',
            qs: {
              url: '={{$parameter["postUrl"]}}',
            },
          },
        },
      },
      {
        name: 'Search Posts',
        value: 'searchPosts',
        description: 'Search posts within a PTT board',
        action: 'Search posts within a PTT board',
        routing: {
          request: {
            method: 'GET',
            url: '=/ptt/boards/{{$parameter["boardName"]}}/search',
            qs: {
              q: '={{$parameter["query"]}}',
            },
          },
        },
      },
    ],
    default: 'getBoard',
  },
];

export const pttFields: INodeProperties[] = [
  {
    displayName: 'Board Name',
    name: 'boardName',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['ptt'],
        operation: ['getBoard', 'getBoardPosts', 'searchPosts'],
      },
    },
    description: 'Board name (e.g., Gossiping, Stock)',
  },
  {
    displayName: 'Post URL',
    name: 'postUrl',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['ptt'],
        operation: ['getPost'],
      },
    },
    description: 'Full PTT post URL or path',
  },
  {
    displayName: 'Query',
    name: 'query',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['ptt'],
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
        resource: ['ptt'],
        operation: ['getBoardPosts'],
      },
    },
    options: [
      {
        displayName: 'Count',
        name: 'count',
        type: 'number',
        typeOptions: { minValue: 1, maxValue: 40 },
        default: 20,
        description: 'Number of posts to return (max 40)',
        routing: {
          request: {
            qs: { count: '={{$value}}' },
          },
        },
      },
      {
        displayName: 'Page',
        name: 'page',
        type: 'number',
        typeOptions: { minValue: 1 },
        default: 0,
        description: 'PTT index page number; omit for latest',
        routing: {
          request: {
            qs: { page: '={{$value}}' },
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
        resource: ['ptt'],
        operation: ['searchPosts'],
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
];
