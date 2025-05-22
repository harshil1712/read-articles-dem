# Read Aloud

A modern web application that converts webpage content to audio using Cloudflare Workers. This tool helps make web content more accessible by providing an audio version of textual content.

## Features

- 🎯 Simple URL input interface
- 🔊 Text-to-speech conversion using Workers AI
- ⚡ Deployed across the globe

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Cloudflare Workers account with access to Cloudflare R2

### Installation

1. Clone the repository:
```bash
git clone https://github.com/harshil1712/read-articles.git
cd read-articles
```

2. Install dependencies:
```bash
npm install
```

3. Create R2 bucket
```bash
npx wrangler@latest r2 create read-aloud-demo
```

### Development

Run the development server:
```bash
npm run dev
```

### Deployment

Deploy to Cloudflare Workers:
```bash
npm run deploy
```

## Tech Stack

- TypeScript
- Cloudflare Workers
- HTML5/CSS3
- Hono


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Resources

- [Hono](https://hono.dev)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [Cloudflare R2](https://developers.cloudflare.com/r2/)
- [Workers AI](https://developers.cloudflare.com/workers-ai/)
- [Browser Rendering](https://developers.cloudflare.com/browser-rendering/)
