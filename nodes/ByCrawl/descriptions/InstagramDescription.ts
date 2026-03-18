import { INodeProperties } from 'n8n-workflow';

export const instagramOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: { resource: ['instagram'] },
    },
    options: [
      {
        name: 'Get User',
        value: 'getUser',
        description: 'Get an Instagram user profile',
        action: 'Get an Instagram user profile',
        routing: {
          request: {
            method: 'GET',
            url: '=/instagram/users/{{$parameter["username"]}}',
          },
        },
      },
      {
        name: 'Get User Posts',
        value: 'getUserPosts',
        description: 'Get posts by an Instagram user',
        action: 'Get posts by an Instagram user',
        routing: {
          request: {
            method: 'GET',
            url: '=/instagram/users/{{$parameter["username"]}}/posts',
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
        description: 'Get a single Instagram post',
        action: 'Get an Instagram post',
        routing: {
          request: {
            method: 'GET',
            url: '=/instagram/posts/{{$parameter["shortcode"]}}',
          },
        },
      },
      {
        name: 'Get Post Comments',
        value: 'getPostComments',
        description: 'Get comments on an Instagram post',
        action: 'Get comments on an Instagram post',
        routing: {
          request: {
            method: 'GET',
            url: '=/instagram/posts/{{$parameter["shortcode"]}}/comments',
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
        name: 'Search Tags',
        value: 'searchTags',
        description: 'Search Instagram tags',
        action: 'Search Instagram tags',
        routing: {
          request: {
            method: 'GET',
            url: '/instagram/tags/search',
            qs: {
              q: '={{$parameter["query"]}}',
            },
          },
          output: {
            postReceive: [
              {
                type: 'rootProperty',
                properties: {
                  property: 'tags',
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

export const instagramFields: INodeProperties[] = [
  {
    displayName: 'Username',
    name: 'username',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['instagram'],
        operation: ['getUser', 'getUserPosts'],
      },
    },
    description: 'The Instagram username (without @)',
  },
  {
    displayName: 'Shortcode',
    name: 'shortcode',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['instagram'],
        operation: ['getPost', 'getPostComments'],
      },
    },
    description: 'The post shortcode from the Instagram URL',
  },
  {
    displayName: 'Query',
    name: 'query',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['instagram'],
        operation: ['searchTags'],
      },
    },
    description: 'Search keyword',
  },
];
