import { INodeProperties } from 'n8n-workflow';

export const webFetchOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: { resource: ['web'] },
    },
    options: [
      {
        name: 'Fetch Page',
        value: 'fetchPage',
        description: 'Fetch and extract content from a web page',
        action: 'Fetch and extract content from a web page',
        routing: {
          request: {
            method: 'GET',
            url: '/web/fetch',
            qs: {
              url: '={{$parameter["pageUrl"]}}',
            },
          },
        },
      },
    ],
    default: 'fetchPage',
  },
];

export const webFetchFields: INodeProperties[] = [
  {
    displayName: 'Page URL',
    name: 'pageUrl',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['web'],
        operation: ['fetchPage'],
      },
    },
    description: 'Target public web page URL',
  },
];
