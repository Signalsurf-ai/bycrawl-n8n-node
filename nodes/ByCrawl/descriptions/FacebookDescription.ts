import { INodeProperties } from 'n8n-workflow';

export const facebookOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: { resource: ['facebook'] },
    },
    options: [
      {
        name: 'Get User',
        value: 'getUser',
        description: 'Get a Facebook page profile',
        action: 'Get a Facebook page profile',
        routing: {
          request: {
            method: 'GET',
            url: '=/facebook/users/{{$parameter["username"]}}',
          },
        },
      },
      {
        name: 'Get User Posts',
        value: 'getUserPosts',
        description: 'Get posts from a Facebook page',
        action: 'Get posts from a Facebook page',
        routing: {
          request: {
            method: 'GET',
            url: '=/facebook/users/{{$parameter["username"]}}/posts',
          },
        },
      },
      {
        name: 'Get Post',
        value: 'getPost',
        description: 'Get a single Facebook post by URL',
        action: 'Get a Facebook post',
        routing: {
          request: {
            method: 'GET',
            url: '/facebook/posts',
            qs: {
              url: '={{$parameter["postUrl"]}}',
            },
          },
        },
      },
      {
        name: 'Get Post Comments',
        value: 'getPostComments',
        description: 'Get comments on a Facebook post',
        action: 'Get comments on a Facebook post',
        routing: {
          request: {
            method: 'GET',
            url: '/facebook/posts/comments',
            qs: {
              url: '={{$parameter["postUrl"]}}',
            },
          },
        },
      },
      {
        name: 'Search Posts',
        value: 'searchPosts',
        description: 'Search Facebook posts',
        action: 'Search Facebook posts',
        routing: {
          request: {
            method: 'GET',
            url: '/facebook/posts/search',
            qs: {
              q: '={{$parameter["query"]}}',
            },
          },
        },
      },
      {
        name: 'Get Marketplace Listings',
        value: 'getMarketplaceListings',
        description: 'Browse Facebook Marketplace listings',
        action: 'Browse Facebook Marketplace listings',
        routing: {
          request: {
            method: 'GET',
            url: '/facebook/marketplace/listings',
          },
        },
      },
      {
        name: 'Search Marketplace',
        value: 'searchMarketplace',
        description: 'Search Facebook Marketplace',
        action: 'Search Facebook Marketplace',
        routing: {
          request: {
            method: 'GET',
            url: '/facebook/marketplace/search',
            qs: {
              q: '={{$parameter["query"]}}',
            },
          },
        },
      },
      {
        name: 'Get Marketplace Item',
        value: 'getMarketplaceItem',
        description: 'Get a Facebook Marketplace item',
        action: 'Get a Facebook Marketplace item',
        routing: {
          request: {
            method: 'GET',
            url: '=/facebook/marketplace/items/{{$parameter["listingId"]}}',
          },
        },
      },
    ],
    default: 'getUser',
  },
];

export const facebookFields: INodeProperties[] = [
  {
    displayName: 'Username',
    name: 'username',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['facebook'],
        operation: ['getUser', 'getUserPosts'],
      },
    },
    description: 'The Facebook page username or ID',
  },
  {
    displayName: 'Post URL',
    name: 'postUrl',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['facebook'],
        operation: ['getPost', 'getPostComments'],
      },
    },
    description: 'Facebook post URL (supports posts, videos, reels, share links)',
  },
  {
    displayName: 'Query',
    name: 'query',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['facebook'],
        operation: ['searchPosts', 'searchMarketplace'],
      },
    },
    description: 'Search keyword',
  },
  {
    displayName: 'Listing ID',
    name: 'listingId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['facebook'],
        operation: ['getMarketplaceItem'],
      },
    },
    description: 'The Facebook Marketplace listing ID',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['facebook'],
        operation: ['getUserPosts'],
      },
    },
    options: [
      {
        displayName: 'Count',
        name: 'count',
        type: 'number',
        typeOptions: { minValue: 1, maxValue: 10 },
        default: 3,
        description: 'Number of posts to return (max 10)',
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
        resource: ['facebook'],
        operation: ['searchPosts'],
      },
    },
    options: [
      {
        displayName: 'Count',
        name: 'count',
        type: 'number',
        typeOptions: { minValue: 1, maxValue: 10 },
        default: 5,
        description: 'Number of results to return (max 10)',
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
        resource: ['facebook'],
        operation: ['getMarketplaceListings'],
      },
    },
    options: [
      {
        displayName: 'Location',
        name: 'location',
        type: 'string',
        default: 'taipei',
        description: 'Location for marketplace listings',
        routing: {
          request: {
            qs: { location: '={{$value}}' },
          },
        },
      },
      {
        displayName: 'Category',
        name: 'category',
        type: 'string',
        default: '',
        description: 'Category to filter listings',
        routing: {
          request: {
            qs: { category: '={{$value}}' },
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
        resource: ['facebook'],
        operation: ['searchMarketplace'],
      },
    },
    options: [
      {
        displayName: 'Location',
        name: 'location',
        type: 'string',
        default: 'taipei',
        description: 'Location for marketplace search',
        routing: {
          request: {
            qs: { location: '={{$value}}' },
          },
        },
      },
      {
        displayName: 'Category',
        name: 'category',
        type: 'string',
        default: '',
        description: 'Category to filter results',
        routing: {
          request: {
            qs: { category: '={{$value}}' },
          },
        },
      },
    ],
  },
];
