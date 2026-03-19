# ByCrawl n8n Community Node — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build and publish `@bycrawl/n8n-nodes-bycrawl`, a declarative n8n community node wrapping all 15 ByCrawl API platforms.

**Architecture:** Single declarative node with platform as resource dropdown. Each platform's operations/fields defined in a separate description file. One shared API key credential. Cursor-based pagination via n8n's built-in requestOperations.

**Tech Stack:** TypeScript, n8n-workflow, n8n-core (peer deps), npm for publishing.

---

### Task 1: Scaffold Project from n8n Starter Template

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `.eslintrc.js`
- Create: `.npmignore`
- Create: `gulpfile.js`

**Step 1: Initialize package.json**

```json
{
  "name": "@bycrawl/n8n-nodes-bycrawl",
  "version": "0.1.0",
  "description": "n8n community node for ByCrawl social media crawler API — supports 15 platforms including Threads, Instagram, Facebook, X/Twitter, TikTok, YouTube, Reddit, LinkedIn, and more.",
  "keywords": [
    "n8n-community-node-package"
  ],
  "license": "MIT",
  "homepage": "https://bycrawl.com",
  "author": {
    "name": "ByCrawl",
    "email": "support@bycrawl.com"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/nicepkg/n8n-nodes-bycrawl"
  },
  "main": "index.js",
  "scripts": {
    "build": "tsc && gulp build:icons",
    "dev": "tsc --watch",
    "format": "prettier nodes credentials --write",
    "lint": "eslint nodes credentials package.json",
    "lintfix": "eslint nodes credentials package.json --fix",
    "prepublishOnly": "npm run build"
  },
  "files": [
    "dist"
  ],
  "n8n": {
    "n8nNodesApiVersion": 1,
    "credentials": [
      "dist/credentials/ByCrawlApi.credentials.js"
    ],
    "nodes": [
      "dist/nodes/ByCrawl/ByCrawl.node.js"
    ]
  },
  "devDependencies": {
    "@typescript-eslint/parser": "~7.18.0",
    "eslint": "~8.56.0",
    "gulp": "^4.0.2",
    "n8n-workflow": "*",
    "prettier": "~3.2.0",
    "typescript": "~5.4.0"
  },
  "peerDependencies": {
    "n8n-workflow": "*"
  }
}
```

**Step 2: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "strict": true,
    "module": "commonjs",
    "target": "es2019",
    "lib": ["es2019"],
    "declaration": true,
    "skipLibCheck": true,
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "include": [
    "nodes/**/*.ts",
    "credentials/**/*.ts"
  ],
  "exclude": [
    "node_modules",
    "dist"
  ]
}
```

**Step 3: Create gulpfile.js for icon copying**

```js
const { src, dest } = require('gulp');

function buildIcons() {
  return src('nodes/**/*.svg').pipe(dest('dist/nodes'));
}

exports['build:icons'] = buildIcons;
```

**Step 4: Create .npmignore**

```
.github/
nodes/**/*.ts
credentials/**/*.ts
gulpfile.js
tsconfig.json
.eslintrc.js
*.ts
!dist/**/*.js
!dist/**/*.d.ts
```

**Step 5: Create .eslintrc.js**

```js
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
```

**Step 6: Create .gitignore**

```
node_modules/
dist/
.DS_Store
```

**Step 7: Install dependencies**

Run: `npm install`

**Step 8: Commit**

```bash
git add package.json tsconfig.json gulpfile.js .npmignore .eslintrc.js .gitignore
git commit -m "chore: scaffold n8n community node project"
```

---

### Task 2: Create ByCrawl API Credential

**Files:**
- Create: `credentials/ByCrawlApi.credentials.ts`

**Step 1: Write credential file**

```typescript
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
```

**Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: No errors

**Step 3: Commit**

```bash
git add credentials/ByCrawlApi.credentials.ts
git commit -m "feat: add ByCrawl API key credential"
```

---

### Task 3: Create Main Node Shell with SVG Icon

**Files:**
- Create: `nodes/ByCrawl/ByCrawl.node.ts`
- Copy: `bycrawl.svg` → `nodes/ByCrawl/bycrawl.svg`

**Step 1: Copy the SVG icon**

Copy from `/Users/kyelchung/signalsurf/ByCrawl/dashboard/public/bycrawl-logo.svg` to `nodes/ByCrawl/bycrawl.svg`.

**Step 2: Write the main node file (shell — no resources yet)**

```typescript
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
      // Operations and fields will be spread from description files
    ],
  };
}
```

**Step 3: Verify it compiles**

Run: `npx tsc --noEmit`

**Step 4: Commit**

```bash
git add nodes/ByCrawl/ByCrawl.node.ts nodes/ByCrawl/bycrawl.svg
git commit -m "feat: add main ByCrawl node shell with icon and resource dropdown"
```

---

### Task 4: Threads Platform Description

**Files:**
- Create: `nodes/ByCrawl/descriptions/ThreadsDescription.ts`
- Modify: `nodes/ByCrawl/ByCrawl.node.ts` (import and spread)

**Step 1: Write ThreadsDescription.ts**

```typescript
import { INodeProperties } from 'n8n-workflow';

export const threadsOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: { resource: ['threads'] },
    },
    options: [
      {
        name: 'Get User',
        value: 'getUser',
        description: 'Get a Threads user profile',
        action: 'Get a Threads user profile',
        routing: {
          request: {
            method: 'GET',
            url: '=/threads/users/{{$parameter["username"]}}',
          },
        },
      },
      {
        name: 'Get User Posts',
        value: 'getUserPosts',
        description: 'Get posts by a Threads user',
        action: 'Get posts by a Threads user',
        routing: {
          request: {
            method: 'GET',
            url: '=/threads/users/{{$parameter["username"]}}/posts',
          },
        },
      },
      {
        name: 'Get User Replies',
        value: 'getUserReplies',
        description: 'Get replies by a Threads user',
        action: 'Get replies by a Threads user',
        routing: {
          request: {
            method: 'GET',
            url: '=/threads/users/{{$parameter["username"]}}/replies',
          },
        },
      },
      {
        name: 'Get Post',
        value: 'getPost',
        description: 'Get a single Threads post by ID',
        action: 'Get a Threads post',
        routing: {
          request: {
            method: 'GET',
            url: '=/threads/posts/{{$parameter["postId"]}}',
          },
        },
      },
      {
        name: 'Get Many Posts',
        value: 'getManyPosts',
        description: 'Get multiple Threads posts by IDs',
        action: 'Get multiple Threads posts',
        routing: {
          request: {
            method: 'GET',
            url: '/threads/posts',
            qs: {
              ids: '={{$parameter["postIds"]}}',
            },
          },
        },
      },
      {
        name: 'Search Posts',
        value: 'searchPosts',
        description: 'Search Threads posts by keyword',
        action: 'Search Threads posts',
        routing: {
          request: {
            method: 'GET',
            url: '/threads/posts/search',
            qs: {
              q: '={{$parameter["query"]}}',
            },
          },
        },
      },
      {
        name: 'Search Users',
        value: 'searchUsers',
        description: 'Search Threads users by keyword',
        action: 'Search Threads users',
        routing: {
          request: {
            method: 'GET',
            url: '/threads/users/search',
            qs: {
              q: '={{$parameter["query"]}}',
            },
          },
        },
      },
      {
        name: 'Get Public Feed',
        value: 'getPublicFeed',
        description: 'Get the Threads public feed',
        action: 'Get the Threads public feed',
        routing: {
          request: {
            method: 'GET',
            url: '/threads/feed/public',
          },
        },
      },
    ],
    default: 'getUser',
  },
];

export const threadsFields: INodeProperties[] = [
  // --- Username field (shared by getUser, getUserPosts, getUserReplies) ---
  {
    displayName: 'Username',
    name: 'username',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['threads'],
        operation: ['getUser', 'getUserPosts', 'getUserReplies'],
      },
    },
    description: 'The Threads username (without @)',
  },
  // --- Post ID field ---
  {
    displayName: 'Post ID',
    name: 'postId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['threads'],
        operation: ['getPost'],
      },
    },
    description: 'The Threads post ID',
  },
  // --- Post IDs field ---
  {
    displayName: 'Post IDs',
    name: 'postIds',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['threads'],
        operation: ['getManyPosts'],
      },
    },
    description: 'Comma-separated list of Threads post IDs',
  },
  // --- Query field ---
  {
    displayName: 'Query',
    name: 'query',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['threads'],
        operation: ['searchPosts', 'searchUsers'],
      },
    },
    description: 'Search keyword',
  },
  // --- Additional Fields for searchPosts ---
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['threads'],
        operation: ['searchPosts'],
      },
    },
    options: [
      {
        displayName: 'Search Type',
        name: 'search_type',
        type: 'options',
        options: [
          { name: 'Top', value: 'top' },
          { name: 'Recent', value: 'recent' },
        ],
        default: 'top',
        routing: {
          request: {
            qs: { search_type: '={{$value}}' },
          },
        },
      },
    ],
  },
  // --- Additional Fields for getUserPosts / getUserReplies ---
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['threads'],
        operation: ['getUserPosts', 'getUserReplies'],
      },
    },
    options: [
      {
        displayName: 'Count',
        name: 'count',
        type: 'number',
        typeOptions: { minValue: 1 },
        default: 10,
        description: 'Number of results to return',
        routing: {
          request: {
            qs: { count: '={{$value}}' },
          },
        },
      },
    ],
  },
  // --- Additional Fields for getPost / getManyPosts ---
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['threads'],
        operation: ['getPost', 'getManyPosts'],
      },
    },
    options: [
      {
        displayName: 'Mode',
        name: 'mode',
        type: 'options',
        options: [
          { name: 'Default', value: 'default' },
          { name: 'Full', value: 'full' },
        ],
        default: 'default',
        description: 'Use "full" for more detailed post data (costs more credits)',
        routing: {
          request: {
            qs: { mode: '={{$value}}' },
          },
        },
      },
    ],
  },
  // --- Additional Fields for getPublicFeed ---
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['threads'],
        operation: ['getPublicFeed'],
      },
    },
    options: [
      {
        displayName: 'Country',
        name: 'country',
        type: 'string',
        default: 'TW',
        description: 'Country code for the feed (e.g., TW, US, JP)',
        routing: {
          request: {
            qs: { country: '={{$value}}' },
          },
        },
      },
    ],
  },
];
```

**Step 2: Update ByCrawl.node.ts to import and spread**

Add import at top:
```typescript
import { threadsOperations, threadsFields } from './descriptions/ThreadsDescription';
```

Spread into properties array after the resource dropdown:
```typescript
properties: [
  // resource dropdown...
  ...threadsOperations,
  ...threadsFields,
],
```

**Step 3: Verify it compiles**

Run: `npx tsc --noEmit`

**Step 4: Commit**

```bash
git add nodes/ByCrawl/descriptions/ThreadsDescription.ts nodes/ByCrawl/ByCrawl.node.ts
git commit -m "feat: add Threads platform operations and fields"
```

---

### Task 5: Instagram Platform Description

**Files:**
- Create: `nodes/ByCrawl/descriptions/InstagramDescription.ts`
- Modify: `nodes/ByCrawl/ByCrawl.node.ts`

**Step 1: Write InstagramDescription.ts**

Follow the same pattern as ThreadsDescription. Operations:

| Operation | URL | Required Params |
|-----------|-----|----------------|
| getUser | `/instagram/users/{{username}}` | username |
| getUserPosts | `/instagram/users/{{username}}/posts` | username |
| getPost | `/instagram/posts/{{shortcode}}` | shortcode |
| getPostComments | `/instagram/posts/{{shortcode}}/comments` | shortcode |
| searchTags | `/instagram/tags/search?q={{query}}` | query |

Fields: `username` (getUser, getUserPosts), `shortcode` (getPost, getPostComments), `query` (searchTags).

**Step 2: Import and spread in ByCrawl.node.ts**

**Step 3: Verify compilation, commit**

```bash
git commit -m "feat: add Instagram platform operations and fields"
```

---

### Task 6: Facebook Platform Description

**Files:**
- Create: `nodes/ByCrawl/descriptions/FacebookDescription.ts`
- Modify: `nodes/ByCrawl/ByCrawl.node.ts`

**Step 1: Write FacebookDescription.ts**

Operations:

| Operation | URL | Required Params |
|-----------|-----|----------------|
| getUser | `/facebook/users/{{username}}` | username |
| getUserPosts | `/facebook/users/{{username}}/posts` | username |
| getPost | `/facebook/posts?url={{url}}` | url |
| getPostComments | `/facebook/posts/comments?url={{url}}` | url |
| searchPosts | `/facebook/posts/search?q={{query}}` | query |
| getMarketplaceListings | `/facebook/marketplace/listings` | — |
| searchMarketplace | `/facebook/marketplace/search?q={{query}}` | query |
| getMarketplaceItem | `/facebook/marketplace/items/{{listingId}}` | listingId |

Additional Fields: `count` on getUserPosts (max 10), `location`/`category` on marketplace ops.

**Step 2: Import and spread, verify, commit**

```bash
git commit -m "feat: add Facebook platform operations and fields"
```

---

### Task 7: X / Twitter Platform Description

**Files:**
- Create: `nodes/ByCrawl/descriptions/XDescription.ts`
- Modify: `nodes/ByCrawl/ByCrawl.node.ts`

Operations:

| Operation | URL | Required Params |
|-----------|-----|----------------|
| getUser | `/x/users/{{username}}` | username |
| getUserPosts | `/x/users/{{username}}/posts` | username |
| getPost | `/x/posts/{{postId}}` | postId |
| searchPosts | `/x/posts/search?q={{query}}` | query |

Additional Fields: `count` (getUserPosts, max 40), `product` (searchPosts: Top/Latest).

```bash
git commit -m "feat: add X/Twitter platform operations and fields"
```

---

### Task 8: TikTok Platform Description

**Files:**
- Create: `nodes/ByCrawl/descriptions/TikTokDescription.ts`
- Modify: `nodes/ByCrawl/ByCrawl.node.ts`

Operations:

| Operation | URL | Required Params |
|-----------|-----|----------------|
| getUser | `/tiktok/users/{{username}}` | username |
| getUserVideos | `/tiktok/users/{{username}}/videos` | username |
| getVideo | `/tiktok/videos/{{videoId}}` | videoId |
| getVideoComments | `/tiktok/videos/{{videoId}}/comments` | videoId |
| getVideoSubtitles | `/tiktok/videos/{{videoId}}/subtitles` | videoId |
| searchVideos | `/tiktok/videos/search?q={{query}}` | query |
| getCategories | `/tiktok/categories` | — |

Additional Fields: `count` (getUserVideos, max 50), `language` (getVideoSubtitles), `category` (getCategories). Note: TikTok comment/search/categories endpoints are slow (20-40s) — set timeout in routing.

```bash
git commit -m "feat: add TikTok platform operations and fields"
```

---

### Task 9: YouTube Platform Description

**Files:**
- Create: `nodes/ByCrawl/descriptions/YouTubeDescription.ts`
- Modify: `nodes/ByCrawl/ByCrawl.node.ts`

Operations:

| Operation | URL | Required Params |
|-----------|-----|----------------|
| getChannel | `/youtube/channels/{{channelId}}` | channelId |
| getVideo | `/youtube/videos/{{videoId}}` | videoId |
| getVideoComments | `/youtube/videos/{{videoId}}/comments` | videoId |
| getVideoTranscription | `/youtube/videos/{{videoId}}/transcription` | videoId |
| searchVideos | `/youtube/videos/search?q={{query}}` | query |

Additional Fields: `count` (getVideoComments max 50, searchVideos max 20), `language` (getVideoTranscription).

```bash
git commit -m "feat: add YouTube platform operations and fields"
```

---

### Task 10: Reddit Platform Description

**Files:**
- Create: `nodes/ByCrawl/descriptions/RedditDescription.ts`
- Modify: `nodes/ByCrawl/ByCrawl.node.ts`

Operations:

| Operation | URL | Required Params |
|-----------|-----|----------------|
| getSubreddit | `/reddit/subreddits/{{name}}` | name |
| getSubredditPosts | `/reddit/subreddits/{{name}}/posts` | name |
| getUser | `/reddit/users/{{username}}` | username |
| getUserPosts | `/reddit/users/{{username}}/posts` | username |
| getPost | `/reddit/posts/{{postId}}` | postId |
| searchPosts | `/reddit/posts/search?q={{query}}` | query |

Additional Fields: `sort` (hot/new/top/rising for subreddit; relevance/hot/top/new/comments for search), `t` (time filter), `count` (max 100).

```bash
git commit -m "feat: add Reddit platform operations and fields"
```

---

### Task 11: LinkedIn Platform Description

**Files:**
- Create: `nodes/ByCrawl/descriptions/LinkedInDescription.ts`
- Modify: `nodes/ByCrawl/ByCrawl.node.ts`

Operations:

| Operation | URL | Required Params |
|-----------|-----|----------------|
| getUser | `/linkedin/users/{{username}}` | username |
| getCompany | `/linkedin/companies/{{companyId}}` | companyId |
| getCompanyJobs | `/linkedin/companies/{{companyId}}/jobs` | companyId |
| getPost | `/linkedin/posts/{{postId}}` | postId |
| getJob | `/linkedin/jobs/{{jobId}}` | jobId |
| searchJobs | `/linkedin/jobs/search?q={{query}}` | query |
| searchUsers | `/linkedin/users/search?q={{query}}` | query |

Additional Fields: `count`, `offset`, `location` (searchJobs).

```bash
git commit -m "feat: add LinkedIn platform operations and fields"
```

---

### Task 12: Dcard Platform Description

**Files:**
- Create: `nodes/ByCrawl/descriptions/DcardDescription.ts`
- Modify: `nodes/ByCrawl/ByCrawl.node.ts`

Operations:

| Operation | URL | Required Params |
|-----------|-----|----------------|
| getForum | `/dcard/forums/{{alias}}` | alias |
| getForumPosts | `/dcard/forums/{{alias}}/posts` | alias |
| getPersona | `/dcard/personas/{{uid}}` | uid |
| searchPosts | `/dcard/posts/search?q={{query}}` | query |

Additional Fields: `count` (max 30), `popular` (boolean, getForumPosts), `limit`/`offset` (searchPosts). Note: Dcard endpoints may take 10-90s — set 120s timeout.

```bash
git commit -m "feat: add Dcard platform operations and fields"
```

---

### Task 13: PTT Platform Description

**Files:**
- Create: `nodes/ByCrawl/descriptions/PttDescription.ts`
- Modify: `nodes/ByCrawl/ByCrawl.node.ts`

Operations:

| Operation | URL | Required Params |
|-----------|-----|----------------|
| getBoard | `/ptt/boards/{{boardName}}` | boardName |
| getBoardPosts | `/ptt/boards/{{boardName}}/posts` | boardName |
| getPost | `/ptt/posts?url={{url}}` | url |
| searchPosts | `/ptt/boards/{{boardName}}/search?q={{query}}` | boardName, query |

Additional Fields: `page`, `count` (max 40).

```bash
git commit -m "feat: add PTT platform operations and fields"
```

---

### Task 14: Google Maps Platform Description

**Files:**
- Create: `nodes/ByCrawl/descriptions/GoogleMapsDescription.ts`
- Modify: `nodes/ByCrawl/ByCrawl.node.ts`

Operations:

| Operation | URL | Required Params |
|-----------|-----|----------------|
| searchPlaces | `/gmaps/places/search?q={{query}}` | query |
| getPlace | `/gmaps/places?query={{query}}` | query |

Additional Fields: `language` (en, ja, zh-TW, etc.).

```bash
git commit -m "feat: add Google Maps platform operations and fields"
```

---

### Task 15: Trustpilot Platform Description

**Files:**
- Create: `nodes/ByCrawl/descriptions/TrustpilotDescription.ts`
- Modify: `nodes/ByCrawl/ByCrawl.node.ts`

Operations:

| Operation | URL | Required Params |
|-----------|-----|----------------|
| getBusiness | `/trustpilot/businesses/{{domain}}` | domain |
| getBusinessReviews | `/trustpilot/businesses/{{domain}}/reviews` | domain |
| searchBusinesses | `/trustpilot/businesses/search?q={{query}}` | query |
| searchCategories | `/trustpilot/categories/search?q={{query}}` | query |
| getSuggestions | `/trustpilot/suggestions?q={{query}}` | query |

Additional Fields: `page`, `sort` (recency/relevance), `stars` (1-5), `languages` on getBusinessReviews.

```bash
git commit -m "feat: add Trustpilot platform operations and fields"
```

---

### Task 16: Job104 Platform Description

**Files:**
- Create: `nodes/ByCrawl/descriptions/Job104Description.ts`
- Modify: `nodes/ByCrawl/ByCrawl.node.ts`

Operations:

| Operation | URL | Required Params |
|-----------|-----|----------------|
| searchJobs | `/job104/jobs/search` | — |
| getJob | `/job104/jobs/{{jobId}}` | jobId |
| getCompany | `/job104/companies/{{companyId}}` | companyId |

Additional Fields: `q`, `welfare`, `area`, `page`, `count` (max 100) on searchJobs.

```bash
git commit -m "feat: add Job104 platform operations and fields"
```

---

### Task 17: 591 Rent Platform Description

**Files:**
- Create: `nodes/ByCrawl/descriptions/Rent591Description.ts`
- Modify: `nodes/ByCrawl/ByCrawl.node.ts`

Operations:

| Operation | URL | Required Params |
|-----------|-----|----------------|
| searchListings | `/rent591/listings` | — |
| getListing | `/rent591/listings/{{listingId}}` | listingId |

Additional Fields: `region` (dropdown: 台北市=1, 新北市=3, etc.), `kind` (整層住家=1, etc.), `price`, `section`, `count` (max 30), `first_row` on searchListings.

```bash
git commit -m "feat: add 591 Rent platform operations and fields"
```

---

### Task 18: Web Fetch Platform Description

**Files:**
- Create: `nodes/ByCrawl/descriptions/WebFetchDescription.ts`
- Modify: `nodes/ByCrawl/ByCrawl.node.ts`

Operations:

| Operation | URL | Required Params |
|-----------|-----|----------------|
| fetchPage | `/web/fetch?url={{url}}` | url |

```bash
git commit -m "feat: add Web Fetch platform operations and fields"
```

---

### Task 19: Build, Test Locally, and Fix Issues

**Step 1: Build the project**

Run: `npm run build`
Expected: Compiles successfully, `dist/` folder created with JS files and SVG icon.

**Step 2: Verify the dist output**

Run: `ls dist/credentials/ dist/nodes/ByCrawl/`
Expected: See `.js` and `.d.ts` files for credential and node, plus `bycrawl.svg` and `descriptions/` folder.

**Step 3: Test in local n8n (manual)**

Run: `npm link` in the project, then `npm link @bycrawl/n8n-nodes-bycrawl` in your n8n installation directory. Restart n8n and verify the ByCrawl node appears.

**Step 4: Fix any compilation or runtime errors**

**Step 5: Commit any fixes**

```bash
git commit -m "fix: resolve build issues"
```

---

### Task 20: README and Final Polish

**Files:**
- Create: `README.md`

**Step 1: Write README.md**

Include:
- Description of what the node does
- Supported platforms (all 15) with operation lists
- Installation instructions (`npm install @bycrawl/n8n-nodes-bycrawl` in community nodes settings)
- Credential setup (how to get a ByCrawl API key)
- Link to ByCrawl docs
- License (MIT)

**Step 2: Commit and tag**

```bash
git add README.md
git commit -m "docs: add README with setup and usage instructions"
git tag v0.1.0
```
