import { INodeProperties } from 'n8n-workflow';

export const trustpilotOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: { resource: ['trustpilot'] },
    },
    options: [
      {
        name: 'Get Business',
        value: 'getBusiness',
        description: 'Get Trustpilot business profile',
        action: 'Get Trustpilot business profile',
        routing: {
          request: {
            method: 'GET',
            url: '=/trustpilot/businesses/{{$parameter["domain"]}}',
          },
        },
      },
      {
        name: 'Get Business Reviews',
        value: 'getBusinessReviews',
        description: 'Get reviews for a business',
        action: 'Get reviews for a business',
        routing: {
          request: {
            method: 'GET',
            url: '=/trustpilot/businesses/{{$parameter["domain"]}}/reviews',
          },
        },
      },
      {
        name: 'Search Businesses',
        value: 'searchBusinesses',
        description: 'Search Trustpilot businesses',
        action: 'Search Trustpilot businesses',
        routing: {
          request: {
            method: 'GET',
            url: '/trustpilot/businesses/search',
            qs: {
              q: '={{$parameter["query"]}}',
            },
          },
        },
      },
      {
        name: 'Search Categories',
        value: 'searchCategories',
        description: 'Search Trustpilot categories',
        action: 'Search Trustpilot categories',
        routing: {
          request: {
            method: 'GET',
            url: '/trustpilot/categories/search',
            qs: {
              q: '={{$parameter["query"]}}',
            },
          },
        },
      },
      {
        name: 'Get Suggestions',
        value: 'getSuggestions',
        description: 'Get business name autocomplete suggestions',
        action: 'Get business name autocomplete suggestions',
        routing: {
          request: {
            method: 'GET',
            url: '/trustpilot/suggestions',
            qs: {
              q: '={{$parameter["query"]}}',
            },
          },
        },
      },
    ],
    default: 'getBusiness',
  },
];

export const trustpilotFields: INodeProperties[] = [
  {
    displayName: 'Domain',
    name: 'domain',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['trustpilot'],
        operation: ['getBusiness', 'getBusinessReviews'],
      },
    },
    description: 'Business domain (e.g., amazon.com, stripe.com)',
  },
  {
    displayName: 'Query',
    name: 'query',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['trustpilot'],
        operation: ['searchBusinesses', 'searchCategories', 'getSuggestions'],
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
        resource: ['trustpilot'],
        operation: ['getBusinessReviews'],
      },
    },
    options: [
      {
        displayName: 'Page',
        name: 'page',
        type: 'number',
        typeOptions: { minValue: 1, maxValue: 100 },
        default: 1,
        description: 'Page number',
        routing: {
          request: {
            qs: { page: '={{$value}}' },
          },
        },
      },
      {
        displayName: 'Sort',
        name: 'sort',
        type: 'options',
        options: [
          { name: 'Recency', value: 'recency' },
          { name: 'Relevance', value: 'relevance' },
        ],
        default: 'recency',
        description: 'Sort order for reviews',
        routing: {
          request: {
            qs: { sort: '={{$value}}' },
          },
        },
      },
      {
        displayName: 'Stars',
        name: 'stars',
        type: 'number',
        typeOptions: { minValue: 1, maxValue: 5 },
        default: 0,
        description: 'Filter by star rating',
        routing: {
          request: {
            qs: { stars: '={{$value}}' },
          },
        },
      },
      {
        displayName: 'Languages',
        name: 'languages',
        type: 'string',
        default: 'all',
        description: 'ISO language code',
        routing: {
          request: {
            qs: { languages: '={{$value}}' },
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
        resource: ['trustpilot'],
        operation: ['searchBusinesses'],
      },
    },
    options: [
      {
        displayName: 'Page',
        name: 'page',
        type: 'number',
        typeOptions: { minValue: 1 },
        default: 1,
        description: 'Page number',
        routing: {
          request: {
            qs: { page: '={{$value}}' },
          },
        },
      },
    ],
  },
];
