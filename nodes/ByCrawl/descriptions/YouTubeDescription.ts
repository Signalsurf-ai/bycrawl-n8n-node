import { INodeProperties } from 'n8n-workflow';

export const youtubeOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: { resource: ['youtube'] },
    },
    options: [
      {
        name: 'Get Channel',
        value: 'getChannel',
        description: 'Get a YouTube channel',
        action: 'Get a YouTube channel',
        routing: {
          request: {
            method: 'GET',
            url: '=/youtube/channels/{{$parameter["channelId"]}}',
          },
        },
      },
      {
        name: 'Get Video',
        value: 'getVideo',
        description: 'Get a YouTube video',
        action: 'Get a YouTube video',
        routing: {
          request: {
            method: 'GET',
            url: '=/youtube/videos/{{$parameter["videoId"]}}',
          },
        },
      },
      {
        name: 'Get Video Comments',
        value: 'getVideoComments',
        description: 'Get comments on a YouTube video',
        action: 'Get comments on a YouTube video',
        routing: {
          request: {
            method: 'GET',
            url: '=/youtube/videos/{{$parameter["videoId"]}}/comments',
          },
          send: { paginate: true },
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
        name: 'Get Video Transcription',
        value: 'getVideoTranscription',
        description: 'Get video transcription',
        action: 'Get video transcription',
        routing: {
          request: {
            method: 'GET',
            url: '=/youtube/videos/{{$parameter["videoId"]}}/transcription',
          },
        },
      },
      {
        name: 'Search Videos',
        value: 'searchVideos',
        description: 'Search YouTube videos',
        action: 'Search YouTube videos',
        routing: {
          request: {
            method: 'GET',
            url: '/youtube/videos/search',
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
                  property: 'videos',
                },
              },
            ],
          },
        },
      },
    ],
    default: 'getChannel',
  },
];

export const youtubeFields: INodeProperties[] = [
  {
    displayName: 'Channel ID',
    name: 'channelId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['youtube'],
        operation: ['getChannel'],
      },
    },
    description: 'Channel ID or @handle',
  },
  {
    displayName: 'Video ID',
    name: 'videoId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['youtube'],
        operation: ['getVideo', 'getVideoComments', 'getVideoTranscription'],
      },
    },
    description: 'The YouTube video ID',
  },
  {
    displayName: 'Query',
    name: 'query',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['youtube'],
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
        resource: ['youtube'],
        operation: ['getVideoComments'],
      },
    },
    options: [
      {
        displayName: 'Count',
        name: 'count',
        type: 'number',
        typeOptions: { minValue: 1, maxValue: 50 },
        default: 20,
        description: 'Number of comments to return',
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
        resource: ['youtube'],
        operation: ['getVideoTranscription'],
      },
    },
    options: [
      {
        displayName: 'Language',
        name: 'language',
        type: 'string',
        default: 'en',
        description: 'Language code for the transcription',
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
        resource: ['youtube'],
        operation: ['searchVideos'],
      },
    },
    options: [
      {
        displayName: 'Count',
        name: 'count',
        type: 'number',
        typeOptions: { minValue: 1, maxValue: 20 },
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
];
