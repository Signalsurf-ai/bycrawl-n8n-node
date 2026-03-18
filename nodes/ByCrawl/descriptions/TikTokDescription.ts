import { INodeProperties } from 'n8n-workflow';

export const tiktokOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: { resource: ['tiktok'] },
    },
    options: [
      {
        name: 'Get User',
        value: 'getUser',
        description: 'Get a TikTok user profile',
        action: 'Get a TikTok user profile',
        routing: {
          request: {
            method: 'GET',
            url: '=/tiktok/users/{{$parameter["username"]}}',
          },
        },
      },
      {
        name: 'Get User Videos',
        value: 'getUserVideos',
        description: 'Get videos by a TikTok user',
        action: 'Get videos by a TikTok user',
        routing: {
          request: {
            method: 'GET',
            url: '=/tiktok/users/{{$parameter["username"]}}/videos',
          },
          output: {
            postReceive: [
              {
                type: 'rootProperty',
                properties: {
                  property: 'videos',
                },
              },
            ],
          },
        },
      },
      {
        name: 'Get Video',
        value: 'getVideo',
        description: 'Get a single TikTok video',
        action: 'Get a TikTok video',
        routing: {
          request: {
            method: 'GET',
            url: '=/tiktok/videos/{{$parameter["videoId"]}}',
          },
        },
      },
      {
        name: 'Get Video Comments',
        value: 'getVideoComments',
        description: 'Get comments on a TikTok video',
        action: 'Get comments on a TikTok video',
        routing: {
          request: {
            method: 'GET',
            url: '=/tiktok/videos/{{$parameter["videoId"]}}/comments',
            timeout: 120000,
          },
          output: {
            postReceive: [
              {
                type: 'rootProperty',
                properties: {
                  property: 'comments',
                },
              },
            ],
          },
        },
      },
      {
        name: 'Get Video Subtitles',
        value: 'getVideoSubtitles',
        description: 'Get subtitles for a TikTok video',
        action: 'Get subtitles for a TikTok video',
        routing: {
          request: {
            method: 'GET',
            url: '=/tiktok/videos/{{$parameter["videoId"]}}/subtitles',
          },
        },
      },
      {
        name: 'Search Videos',
        value: 'searchVideos',
        description: 'Search TikTok videos',
        action: 'Search TikTok videos',
        routing: {
          request: {
            method: 'GET',
            url: '/tiktok/videos/search',
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
                  property: 'videos',
                },
              },
            ],
          },
        },
      },
      {
        name: 'Get Categories',
        value: 'getCategories',
        description: 'Get TikTok trending/category videos',
        action: 'Get TikTok trending/category videos',
        routing: {
          request: {
            method: 'GET',
            url: '/tiktok/categories',
            timeout: 120000,
          },
        },
      },
    ],
    default: 'getUser',
  },
];

export const tiktokFields: INodeProperties[] = [
  {
    displayName: 'Username',
    name: 'username',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['tiktok'],
        operation: ['getUser', 'getUserVideos'],
      },
    },
    description: 'The TikTok username (without @)',
  },
  {
    displayName: 'Video ID',
    name: 'videoId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['tiktok'],
        operation: ['getVideo', 'getVideoComments', 'getVideoSubtitles'],
      },
    },
    description: 'The TikTok video ID',
  },
  {
    displayName: 'Query',
    name: 'query',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['tiktok'],
        operation: ['searchVideos'],
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
        resource: ['tiktok'],
        operation: ['getUserVideos'],
      },
    },
    options: [
      {
        displayName: 'Count',
        name: 'count',
        type: 'number',
        typeOptions: { minValue: 1, maxValue: 50 },
        default: 30,
        description: 'Number of videos to return (max 50)',
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
        resource: ['tiktok'],
        operation: ['getVideoSubtitles'],
      },
    },
    options: [
      {
        displayName: 'Language',
        name: 'language',
        type: 'string',
        default: 'en',
        description: 'Language code for subtitles (supports 40+ languages)',
        routing: {
          request: {
            qs: { language: '={{$value}}' },
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
        resource: ['tiktok'],
        operation: ['searchVideos'],
      },
    },
    options: [
      {
        displayName: 'Count',
        name: 'count',
        type: 'number',
        typeOptions: { minValue: 1, maxValue: 30 },
        default: 20,
        description: 'Number of videos to return (max 30)',
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
        resource: ['tiktok'],
        operation: ['getCategories'],
      },
    },
    options: [
      {
        displayName: 'Category',
        name: 'category',
        type: 'string',
        default: '',
        description: 'Category name to filter by',
        routing: {
          request: {
            qs: { category: '={{$value}}' },
          },
        },
      },
      {
        displayName: 'Count',
        name: 'count',
        type: 'number',
        typeOptions: { minValue: 1, maxValue: 50 },
        default: 30,
        description: 'Number of videos to return (max 50)',
        routing: {
          request: {
            qs: { count: '={{$value}}' },
          },
        },
      },
    ],
  },
];
