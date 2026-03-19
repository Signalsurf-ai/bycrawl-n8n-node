import type {
	IExecutePaginationFunctions,
	INodeExecutionData,
	IDataObject,
} from 'n8n-workflow';
import type { DeclarativeRestApiSettings } from 'n8n-workflow';

/**
 * ByCrawl API pagination handler.
 *
 * Supports two cursor patterns returned by the API:
 *  1. { cursor: "...", hasMore: true }         — Threads posts, TikTok, etc.
 *  2. { nextCursor: "..." }                    — Facebook, Reddit, etc.
 *  3. { pageInfo: { endCursor, hasNextPage } } — Threads search
 *
 * All use `cursor` as the query parameter for the next page.
 */
export async function byCrawlApiPagination(
	this: IExecutePaginationFunctions,
	requestData: DeclarativeRestApiSettings.ResultOptions,
): Promise<INodeExecutionData[]> {
	const responseData: INodeExecutionData[] = [];
	const returnAll = this.getNodeParameter('returnAll', false) as boolean;
	const limit = returnAll ? 0 : (this.getNodeParameter('limit', 100) as number);

	requestData.options.qs = requestData.options.qs ?? {};

	let hasMore = true;

	do {
		const pageResponse = await this.makeRoutingRequest(requestData);

		for (const item of pageResponse) {
			responseData.push(item);

			if (!returnAll && responseData.length >= limit) {
				return responseData.slice(0, limit);
			}
		}

		// Try to extract cursor from the raw response
		// The response structure varies: the pagination fields are at the top level
		// of the original response, but postReceive may have already unwrapped the array.
		// We need to check the last page response for cursor info.
		const lastItem = pageResponse[pageResponse.length - 1];
		if (!lastItem) break;

		const json = lastItem.json as IDataObject;

		// Pattern 1: { cursor, hasMore }
		// Pattern 2: { nextCursor }
		// Pattern 3: { pageInfo: { endCursor, hasNextPage } }
		let nextCursor: string | undefined;

		if (json.cursor && typeof json.cursor === 'string') {
			nextCursor = json.cursor;
		} else if (json.nextCursor && typeof json.nextCursor === 'string') {
			nextCursor = json.nextCursor;
		} else if (json.pageInfo && typeof json.pageInfo === 'object') {
			const pageInfo = json.pageInfo as IDataObject;
			if (pageInfo.hasNextPage && pageInfo.endCursor) {
				nextCursor = pageInfo.endCursor as string;
			}
		}

		if (!nextCursor) {
			hasMore = false;
		} else {
			requestData.options.qs = {
				...requestData.options.qs,
				cursor: nextCursor,
			};
		}
	} while (hasMore);

	return responseData;
}
