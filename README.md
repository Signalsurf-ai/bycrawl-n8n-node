# n8n-nodes-bycrawl

This is an n8n community node that lets you use the [ByCrawl](https://bycrawl.com) API to crawl social media data from 15+ platforms in your n8n workflows.

## Installation

In n8n, go to **Settings > Community Nodes** and install:

```
@bycrawl/n8n-nodes-bycrawl
```

## Credentials

You need a ByCrawl API key to use this node.

1. Sign up at [https://bycrawl.com](https://bycrawl.com) to get one.
2. In n8n, go to **Credentials** and create a new **ByCrawl API** credential.
3. Paste your API key and save.

## Supported Platforms

| Platform | Operations | Examples |
|---|---|---|
| Threads | 8 | Get User, Search Posts, Get Public Feed |
| Instagram | 5 | Get User, Get Post, Search Tags |
| Facebook | 8 | Get User, Search Posts, Marketplace |
| X / Twitter | 4 | Get User, Get Post, Search Posts |
| TikTok | 7 | Get User, Get Video, Search Videos, Subtitles |
| YouTube | 5 | Get Channel, Get Video, Transcription |
| Reddit | 6 | Get Subreddit, Get User, Search Posts |
| LinkedIn | 7 | Get User, Get Company, Search Jobs |
| Dcard | 4 | Get Forum, Search Posts |
| PTT | 4 | Get Board, Get Post, Search |
| Google Maps | 2 | Search Places, Get Place |
| Trustpilot | 5 | Get Business, Get Reviews, Search |
| Job104 | 3 | Search Jobs, Get Job, Get Company |
| 591 Rent | 2 | Search Listings, Get Listing |
| Web Fetch | 1 | Fetch Page |

## Resources

- [ByCrawl API Documentation](https://bycrawl.com/en/docs)
- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)

## License

[MIT](LICENSE)
