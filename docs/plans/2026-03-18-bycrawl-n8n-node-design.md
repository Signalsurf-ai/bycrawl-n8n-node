# ByCrawl n8n Community Node — Design

## Overview

A public n8n community node (`@bycrawl/n8n-nodes-bycrawl`) that wraps the ByCrawl social media crawler API, supporting all 15 platforms in a single declarative-style node.

## Architecture

### Style: Declarative

n8n's declarative style — no `execute()` method. API routing defined in the node description. Each operation has a `routing` object mapping to a ByCrawl endpoint.

Rationale: ByCrawl's API is REST-consistent (all GET, query params, header auth). Declarative handles this perfectly with less code and built-in pagination.

### Project Structure

```
n8n-nodes-bycrawl/
├── package.json              # @bycrawl/n8n-nodes-bycrawl
├── tsconfig.json
├── .eslintrc.js
├── credentials/
│   └── ByCrawlApi.credentials.ts
├── nodes/
│   └── ByCrawl/
│       ├── ByCrawl.node.ts
│       ├── bycrawl.svg
│       └── descriptions/
│           ├── ThreadsDescription.ts
│           ├── InstagramDescription.ts
│           ├── FacebookDescription.ts
│           ├── XDescription.ts
│           ├── TikTokDescription.ts
│           ├── YouTubeDescription.ts
│           ├── RedditDescription.ts
│           ├── LinkedInDescription.ts
│           ├── DcardDescription.ts
│           ├── PttDescription.ts
│           ├── GoogleMapsDescription.ts
│           ├── TrustpilotDescription.ts
│           ├── Job104Description.ts
│           ├── Rent591Description.ts
│           └── WebFetchDescription.ts
```

## Credential

Single `ByCrawlApi` credential:
- Field: `apiKey` (string, type `string` with `typeOptions: { password: true }`)
- Auth: `x-api-key` header via `authenticate.generic`
- Test: `GET /threads/users/zuck` to validate key

## Resources & Operations

### Threads
- Get User: `GET /threads/users/:username`
- Get User Posts: `GET /threads/users/:username/posts`
- Get User Replies: `GET /threads/users/:username/replies`
- Get Post: `GET /threads/posts/:id`
- Get Many Posts: `GET /threads/posts?ids=a,b,c`
- Search Posts: `GET /threads/posts/search?q=xxx`
- Search Users: `GET /threads/users/search?q=xxx`
- Get Public Feed: `GET /threads/feed/public`

### Instagram
- Get User: `GET /instagram/users/:username`
- Get User Posts: `GET /instagram/users/:username/posts`
- Get Post: `GET /instagram/posts/:shortcode`
- Get Post Comments: `GET /instagram/posts/:shortcode/comments`
- Search Tags: `GET /instagram/tags/search?q=xxx`

### Facebook
- Get User: `GET /facebook/users/:username`
- Get User Posts: `GET /facebook/users/:username/posts`
- Get Post: `GET /facebook/posts?url=xxx`
- Get Post Comments: `GET /facebook/posts/comments?url=xxx`
- Search Posts: `GET /facebook/posts/search?q=xxx`
- Get Marketplace Listings: `GET /facebook/marketplace/listings`
- Search Marketplace: `GET /facebook/marketplace/search?q=xxx`
- Get Marketplace Item: `GET /facebook/marketplace/items/:listing_id`

### X / Twitter
- Get User: `GET /x/users/:username`
- Get User Posts: `GET /x/users/:username/posts`
- Get Post: `GET /x/posts/:id`
- Search Posts: `GET /x/posts/search?q=xxx`

### TikTok
- Get User: `GET /tiktok/users/:username`
- Get User Videos: `GET /tiktok/users/:username/videos`
- Get Video: `GET /tiktok/videos/:videoId`
- Get Video Comments: `GET /tiktok/videos/:videoId/comments`
- Get Video Subtitles: `GET /tiktok/videos/:videoId/subtitles`
- Search Videos: `GET /tiktok/videos/search?q=xxx`
- Get Categories: `GET /tiktok/categories`

### YouTube
- Get Channel: `GET /youtube/channels/:channelId`
- Get Video: `GET /youtube/videos/:videoId`
- Get Video Comments: `GET /youtube/videos/:videoId/comments`
- Get Video Transcription: `GET /youtube/videos/:videoId/transcription`
- Search Videos: `GET /youtube/videos/search?q=xxx`

### Reddit
- Get Subreddit: `GET /reddit/subreddits/:name`
- Get Subreddit Posts: `GET /reddit/subreddits/:name/posts`
- Get User: `GET /reddit/users/:username`
- Get User Posts: `GET /reddit/users/:username/posts`
- Get Post: `GET /reddit/posts/:postId`
- Search Posts: `GET /reddit/posts/search?q=xxx`

### LinkedIn
- Get User: `GET /linkedin/users/:username`
- Get Company: `GET /linkedin/companies/:companyId`
- Get Company Jobs: `GET /linkedin/companies/:companyId/jobs`
- Get Post: `GET /linkedin/posts/:postId`
- Get Job: `GET /linkedin/jobs/:jobId`
- Search Jobs: `GET /linkedin/jobs/search?q=xxx`
- Search Users: `GET /linkedin/users/search?q=xxx`

### Dcard
- Endpoints TBD (fetch from API docs during implementation)

### PTT
- Endpoints TBD (fetch from API docs during implementation)

### Google Maps
- Search Places: `GET /gmaps/places/search`

### Trustpilot
- Endpoints TBD (fetch from API docs during implementation)

### Job104
- Search Jobs: `GET /job104/jobs/search`

### 591 Rent
- Endpoints TBD (fetch from API docs during implementation)

### Web Fetch
- Fetch Page: `GET /web/fetch`

## Pagination

- Operations returning lists have a "Return All" toggle
- When off, a "Limit" field controls max results
- Implemented via n8n's `requestOperations.pagination` with cursor-based strategy
- Cursor field varies by platform: `cursor`, `after`, `nextCursor`, `nextPageToken`

## Error Handling

- ByCrawl HTTP errors (400, 401, 403, 404, 429, 500) auto-surfaced by n8n
- "Continue On Fail" built-in option
- TikTok slow endpoints: longer timeout via per-operation routing config
- `postReceive` hooks to unwrap nested response objects (extract arrays from wrapper)

## Node Metadata

- Display name: "ByCrawl"
- Name: `byCrawl`
- Color: `#34D399` (from logo)
- Icon: `bycrawl.svg`
- Package: `@bycrawl/n8n-nodes-bycrawl`
- Keyword: `n8n-community-node-package`

## Publishing

- npm publish as `@bycrawl/n8n-nodes-bycrawl`
- Start at version `0.1.0`, semver
- README with setup instructions and supported operations
- Build: `tsc` → `dist/`
