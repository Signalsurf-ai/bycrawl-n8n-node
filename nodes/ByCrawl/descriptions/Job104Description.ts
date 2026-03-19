import { INodeProperties } from 'n8n-workflow';

export const job104Operations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: { resource: ['job104'] },
    },
    options: [
      {
        name: 'Search Jobs',
        value: 'searchJobs',
        description: 'Search Job104 job listings',
        action: 'Search Job104 job listings',
        routing: {
          request: {
            method: 'GET',
            url: '/job104/jobs/search',
          },
          send: { paginate: true },
          output: {
            postReceive: [
              {
                type: 'rootProperty',
                properties: {
                  property: 'jobs',
                },
              },
            ],
          },
        },
      },
      {
        name: 'Get Job',
        value: 'getJob',
        description: 'Get Job104 job details',
        action: 'Get Job104 job details',
        routing: {
          request: {
            method: 'GET',
            url: '=/job104/jobs/{{$parameter["jobId"]}}',
          },
        },
      },
      {
        name: 'Get Company',
        value: 'getCompany',
        description: 'Get Job104 company details',
        action: 'Get Job104 company details',
        routing: {
          request: {
            method: 'GET',
            url: '=/job104/companies/{{$parameter["companyId"]}}',
          },
        },
      },
    ],
    default: 'searchJobs',
  },
];

export const job104Fields: INodeProperties[] = [
  {
    displayName: 'Job ID',
    name: 'jobId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['job104'],
        operation: ['getJob'],
      },
    },
    description: 'The Job104 job ID',
  },
  {
    displayName: 'Company ID',
    name: 'companyId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['job104'],
        operation: ['getCompany'],
      },
    },
    description: 'The Job104 company ID',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['job104'],
        operation: ['searchJobs'],
      },
    },
    options: [
      {
        displayName: 'Query',
        name: 'q',
        type: 'string',
        default: '',
        description: 'Search keyword',
        routing: {
          request: {
            qs: { q: '={{$value}}' },
          },
        },
      },
      {
        displayName: 'Welfare',
        name: 'welfare',
        type: 'string',
        default: '',
        description: 'Welfare code filter',
        routing: {
          request: {
            qs: { welfare: '={{$value}}' },
          },
        },
      },
      {
        displayName: 'Area',
        name: 'area',
        type: 'string',
        default: '',
        description: 'Area code filter',
        routing: {
          request: {
            qs: { area: '={{$value}}' },
          },
        },
      },
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
      {
        displayName: 'Count',
        name: 'count',
        type: 'number',
        typeOptions: { minValue: 1, maxValue: 100 },
        default: 20,
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
