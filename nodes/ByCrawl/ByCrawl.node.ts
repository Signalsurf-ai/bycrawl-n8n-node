import { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { byCrawlApiPagination } from './GenericFunctions';
import { threadsOperations, threadsFields } from './descriptions/ThreadsDescription';
import { instagramOperations, instagramFields } from './descriptions/InstagramDescription';
import { facebookOperations, facebookFields } from './descriptions/FacebookDescription';
import { xOperations, xFields } from './descriptions/XDescription';
import { tiktokOperations, tiktokFields } from './descriptions/TikTokDescription';
import { youtubeOperations, youtubeFields } from './descriptions/YouTubeDescription';
import { redditOperations, redditFields } from './descriptions/RedditDescription';
import { linkedinOperations, linkedinFields } from './descriptions/LinkedInDescription';
import { dcardOperations, dcardFields } from './descriptions/DcardDescription';
import { pttOperations, pttFields } from './descriptions/PttDescription';
import { gmapsOperations, gmapsFields } from './descriptions/GoogleMapsDescription';
import { trustpilotOperations, trustpilotFields } from './descriptions/TrustpilotDescription';
import { job104Operations, job104Fields } from './descriptions/Job104Description';
import { rent591Operations, rent591Fields } from './descriptions/Rent591Description';
import { webFetchOperations, webFetchFields } from './descriptions/WebFetchDescription';

// Operations that return paginated lists (used for Return All / Limit display options)
const paginatedOperations = [
	'getUserPosts', 'getUserReplies', 'searchPosts', 'searchUsers', 'getPublicFeed',
	'getPostComments', 'getUserVideos', 'getVideoComments', 'searchVideos',
	'getSubredditPosts', 'getCompanyJobs', 'searchJobs', 'getForumPosts',
	'getMarketplaceListings', 'searchMarketplace', 'searchTags',
	'searchPlaces', 'searchBusinesses', 'searchCategories', 'searchListings',
	'getCategoryVideos', 'searchUsers',
];

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
		requestOperations: {
			pagination: byCrawlApiPagination,
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
			{
				displayName: 'Return All',
				name: 'returnAll',
				type: 'boolean',
				default: false,
				description: 'Whether to return all results or only up to a given limit',
				displayOptions: {
					show: {
						operation: paginatedOperations,
					},
				},
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: { minValue: 1 },
				default: 50,
				description: 'Max number of results to return',
				displayOptions: {
					show: {
						operation: paginatedOperations,
						returnAll: [false],
					},
				},
			},
			...threadsOperations,
			...threadsFields,
			...instagramOperations,
			...instagramFields,
			...facebookOperations,
			...facebookFields,
			...xOperations,
			...xFields,
			...tiktokOperations,
			...tiktokFields,
			...youtubeOperations,
			...youtubeFields,
			...redditOperations,
			...redditFields,
			...linkedinOperations,
			...linkedinFields,
			...dcardOperations,
			...dcardFields,
			...pttOperations,
			...pttFields,
			...gmapsOperations,
			...gmapsFields,
			...trustpilotOperations,
			...trustpilotFields,
			...job104Operations,
			...job104Fields,
			...rent591Operations,
			...rent591Fields,
			...webFetchOperations,
			...webFetchFields,
		],
	};
}
