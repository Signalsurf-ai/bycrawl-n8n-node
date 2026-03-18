import { INodeProperties } from 'n8n-workflow';

export const linkedinOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: { resource: ['linkedin'] },
    },
    options: [
      {
        name: 'Get User',
        value: 'getUser',
        description: 'Get a LinkedIn user profile',
        action: 'Get a LinkedIn user profile',
        routing: {
          request: {
            method: 'GET',
            url: '=/linkedin/users/{{$parameter["username"]}}',
          },
        },
      },
      {
        name: 'Get Company',
        value: 'getCompany',
        description: 'Get a LinkedIn company profile',
        action: 'Get a LinkedIn company profile',
        routing: {
          request: {
            method: 'GET',
            url: '=/linkedin/companies/{{$parameter["companyId"]}}',
          },
        },
      },
      {
        name: 'Get Company Jobs',
        value: 'getCompanyJobs',
        description: 'Get jobs from a LinkedIn company',
        action: 'Get jobs from a LinkedIn company',
        routing: {
          request: {
            method: 'GET',
            url: '=/linkedin/companies/{{$parameter["companyId"]}}/jobs',
          },
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
        name: 'Get Post',
        value: 'getPost',
        description: 'Get a LinkedIn post',
        action: 'Get a LinkedIn post',
        routing: {
          request: {
            method: 'GET',
            url: '=/linkedin/posts/{{$parameter["postId"]}}',
          },
        },
      },
      {
        name: 'Get Job',
        value: 'getJob',
        description: 'Get a LinkedIn job',
        action: 'Get a LinkedIn job',
        routing: {
          request: {
            method: 'GET',
            url: '=/linkedin/jobs/{{$parameter["jobId"]}}',
          },
        },
      },
      {
        name: 'Search Jobs',
        value: 'searchJobs',
        description: 'Search LinkedIn jobs',
        action: 'Search LinkedIn jobs',
        routing: {
          request: {
            method: 'GET',
            url: '/linkedin/jobs/search',
            qs: {
              q: '={{$parameter["query"]}}',
            },
          },
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
        name: 'Search Users',
        value: 'searchUsers',
        description: 'Search LinkedIn users',
        action: 'Search LinkedIn users',
        routing: {
          request: {
            method: 'GET',
            url: '/linkedin/users/search',
            qs: {
              q: '={{$parameter["query"]}}',
            },
          },
          output: {
            postReceive: [
              {
                type: 'rootProperty',
                properties: {
                  property: 'users',
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

export const linkedinFields: INodeProperties[] = [
  {
    displayName: 'Username',
    name: 'username',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['linkedin'],
        operation: ['getUser'],
      },
    },
    description: 'The LinkedIn username',
  },
  {
    displayName: 'Company ID',
    name: 'companyId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['linkedin'],
        operation: ['getCompany', 'getCompanyJobs'],
      },
    },
    description: 'Company vanity name or numeric ID',
  },
  {
    displayName: 'Post ID',
    name: 'postId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['linkedin'],
        operation: ['getPost'],
      },
    },
    description: 'The LinkedIn post ID',
  },
  {
    displayName: 'Job ID',
    name: 'jobId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['linkedin'],
        operation: ['getJob'],
      },
    },
    description: 'The LinkedIn job ID',
  },
  {
    displayName: 'Query',
    name: 'query',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['linkedin'],
        operation: ['searchJobs', 'searchUsers'],
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
        resource: ['linkedin'],
        operation: ['getCompanyJobs'],
      },
    },
    options: [
      {
        displayName: 'Count',
        name: 'count',
        type: 'number',
        typeOptions: { minValue: 1, maxValue: 100 },
        default: 25,
        description: 'Number of results to return',
        routing: {
          request: {
            qs: { count: '={{$value}}' },
          },
        },
      },
      {
        displayName: 'Offset',
        name: 'offset',
        type: 'number',
        typeOptions: { minValue: 0 },
        default: 0,
        description: 'Offset for pagination',
        routing: {
          request: {
            qs: { offset: '={{$value}}' },
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
        resource: ['linkedin'],
        operation: ['searchJobs'],
      },
    },
    options: [
      {
        displayName: 'Location',
        name: 'location',
        type: 'string',
        default: '',
        description: 'Location to filter jobs',
        routing: {
          request: {
            qs: { location: '={{$value}}' },
          },
        },
      },
      {
        displayName: 'Count',
        name: 'count',
        type: 'number',
        typeOptions: { minValue: 1, maxValue: 100 },
        default: 25,
        description: 'Number of results to return',
        routing: {
          request: {
            qs: { count: '={{$value}}' },
          },
        },
      },
      {
        displayName: 'Offset',
        name: 'offset',
        type: 'number',
        typeOptions: { minValue: 0 },
        default: 0,
        description: 'Offset for pagination',
        routing: {
          request: {
            qs: { offset: '={{$value}}' },
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
        resource: ['linkedin'],
        operation: ['searchUsers'],
      },
    },
    options: [
      {
        displayName: 'Count',
        name: 'count',
        type: 'number',
        typeOptions: { minValue: 1, maxValue: 100 },
        default: 25,
        description: 'Number of results to return',
        routing: {
          request: {
            qs: { count: '={{$value}}' },
          },
        },
      },
      {
        displayName: 'Offset',
        name: 'offset',
        type: 'number',
        typeOptions: { minValue: 0 },
        default: 0,
        description: 'Offset for pagination',
        routing: {
          request: {
            qs: { offset: '={{$value}}' },
          },
        },
      },
    ],
  },
];
