import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class ByCrawl implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'ByCrawl',
    name: 'byCrawl',
    icon: 'file:bycrawl.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
    description: 'Crawl social media data from 15+ platforms using ByCrawl API',
    defaults: {
      name: 'ByCrawl',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'byCrawlApi',
        required: true,
      },
    ],
    requestDefaults: {
      baseURL: 'https://api.bycrawl.com',
      headers: {
        Accept: 'application/json',
      },
    },
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          { name: 'Threads', value: 'threads' },
          { name: 'Instagram', value: 'instagram' },
          { name: 'Facebook', value: 'facebook' },
          { name: 'X / Twitter', value: 'x' },
          { name: 'TikTok', value: 'tiktok' },
          { name: 'YouTube', value: 'youtube' },
          { name: 'Reddit', value: 'reddit' },
          { name: 'LinkedIn', value: 'linkedin' },
          { name: 'Dcard', value: 'dcard' },
          { name: 'PTT', value: 'ptt' },
          { name: 'Google Maps', value: 'gmaps' },
          { name: 'Trustpilot', value: 'trustpilot' },
          { name: 'Job104', value: 'job104' },
          { name: '591 Rent', value: 'rent591' },
          { name: 'Web Fetch', value: 'web' },
        ],
        default: 'threads',
      },
    ],
  };
}
