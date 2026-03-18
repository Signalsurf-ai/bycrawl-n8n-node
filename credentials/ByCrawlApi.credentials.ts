import {
  IAuthenticateGeneric,
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class ByCrawlApi implements ICredentialType {
  name = 'byCrawlApi';
  displayName = 'ByCrawl API';
  documentationUrl = 'https://bycrawl.com/en/docs/getting-started';
  properties: INodeProperties[] = [
    {
      displayName: 'API Key',
      name: 'apiKey',
      type: 'string',
      typeOptions: { password: true },
      default: '',
      required: true,
      description: 'Your ByCrawl API key (starts with sk_byc_)',
    },
  ];
  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {
      headers: {
        'x-api-key': '={{$credentials.apiKey}}',
      },
    },
  };
  test: ICredentialTestRequest = {
    request: {
      baseURL: 'https://api.bycrawl.com',
      url: '/threads/users/zuck',
      method: 'GET',
    },
  };
}
