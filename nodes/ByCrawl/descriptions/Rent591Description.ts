import { INodeProperties } from 'n8n-workflow';

export const rent591Operations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: { resource: ['rent591'] },
    },
    options: [
      {
        name: 'Search Listings',
        value: 'searchListings',
        description: 'Search 591 rental listings',
        action: 'Search 591 rental listings',
        routing: {
          request: {
            method: 'GET',
            url: '/rent591/listings',
          },
        },
      },
      {
        name: 'Get Listing',
        value: 'getListing',
        description: 'Get 591 rental listing details',
        action: 'Get 591 rental listing details',
        routing: {
          request: {
            method: 'GET',
            url: '=/rent591/listings/{{$parameter["listingId"]}}',
          },
        },
      },
    ],
    default: 'searchListings',
  },
];

export const rent591Fields: INodeProperties[] = [
  {
    displayName: 'Listing ID',
    name: 'listingId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['rent591'],
        operation: ['getListing'],
      },
    },
    description: 'The 591 rental listing ID',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['rent591'],
        operation: ['searchListings'],
      },
    },
    options: [
      {
        displayName: 'Region',
        name: 'region',
        type: 'options',
        options: [
          { name: '台北市', value: 1 },
          { name: '新北市', value: 3 },
          { name: '桃園市', value: 6 },
          { name: '新竹市', value: 5 },
          { name: '台中市', value: 8 },
          { name: '台南市', value: 15 },
          { name: '高雄市', value: 17 },
        ],
        default: 1,
        description: 'Region to search in',
        routing: {
          request: {
            qs: { region: '={{$value}}' },
          },
        },
      },
      {
        displayName: 'Kind',
        name: 'kind',
        type: 'options',
        options: [
          { name: '整層住家', value: 1 },
          { name: '獨立套房', value: 2 },
          { name: '分租套房', value: 3 },
          { name: '雅房', value: 4 },
          { name: '車位', value: 8 },
        ],
        default: 1,
        description: 'Type of rental listing',
        routing: {
          request: {
            qs: { kind: '={{$value}}' },
          },
        },
      },
      {
        displayName: 'Price',
        name: 'price',
        type: 'string',
        default: '',
        description: 'Price range e.g. 5000_10000$',
        routing: {
          request: {
            qs: { price: '={{$value}}' },
          },
        },
      },
      {
        displayName: 'Count',
        name: 'count',
        type: 'number',
        typeOptions: { minValue: 1, maxValue: 30 },
        default: 30,
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
