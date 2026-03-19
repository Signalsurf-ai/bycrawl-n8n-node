import { INodeProperties } from 'n8n-workflow';

export const gmapsOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: { resource: ['gmaps'] },
    },
    options: [
      {
        name: 'Search Places',
        value: 'searchPlaces',
        description: 'Search Google Maps places',
        action: 'Search Google Maps places',
        routing: {
          request: {
            method: 'GET',
            url: '/gmaps/places/search',
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
                  property: 'places',
                },
              },
            ],
          },
        },
      },
      {
        name: 'Get Place',
        value: 'getPlace',
        description: 'Get full details for a place',
        action: 'Get full details for a place',
        routing: {
          request: {
            method: 'GET',
            url: '/gmaps/places',
            qs: {
              query: '={{$parameter["placeQuery"]}}',
            },
          },
        },
      },
    ],
    default: 'searchPlaces',
  },
];

export const gmapsFields: INodeProperties[] = [
  {
    displayName: 'Query',
    name: 'query',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['gmaps'],
        operation: ['searchPlaces'],
      },
    },
    description: 'Search keyword',
  },
  {
    displayName: 'Place Query',
    name: 'placeQuery',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['gmaps'],
        operation: ['getPlace'],
      },
    },
    description: 'Venue name or full Google Maps URL',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['gmaps'],
        operation: ['searchPlaces'],
      },
    },
    options: [
      {
        displayName: 'Language',
        name: 'language',
        type: 'string',
        default: 'en',
        description: 'Language code (en, ja, zh-TW, etc.)',
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
        resource: ['gmaps'],
        operation: ['getPlace'],
      },
    },
    options: [
      {
        displayName: 'Language',
        name: 'language',
        type: 'string',
        default: 'en',
        description: 'Language code (en, ja, zh-TW, etc.)',
        routing: {
          request: {
            qs: { language: '={{$value}}' },
          },
        },
      },
    ],
  },
];
