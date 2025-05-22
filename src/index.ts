import { Hono } from 'hono';
import puppeteer from '@cloudflare/puppeteer';

const app = new Hono<{ Bindings: Cloudflare.Env }>();

app.get('/', (c) => {
	return c.text('Hello Hono!');
});

app.post('/api/audio', async (c) => {
	const { url } = await c.req.json();

	const normalizedUrl = new URL(url).toString();

	// 1. Extract the blog content
	// 1a. Launch an instance of puppeteer
	const browser = await puppeteer.launch(c.env.MYBROWSER);
	const page = await browser.newPage();
	// 1b. Navigate to the URL
	await page.goto(normalizedUrl);

	// 1c. Extract the blog content
	const blogText = await page.evaluate(() => {
		// @ts-ignore js code to run in the browser context
		const body = document.querySelector('main');
		return body ? body.innerText : '';
	});

	// 1d. Close the browser
	await browser.close();

	// 2. Generate TTS
	const response = await c.env.AI.run('@cf/myshell-ai/melotts', {
		prompt: blogText,
	});

	// 3. Store in R2 bucket
	// 3a. For the file name use the slug, handle trailing slashes and empty slugs
	const cleanUrl = normalizedUrl.replace(/\/$/, ''); // Remove trailing slash
	const slug = cleanUrl.split('/').pop() || 'article'; // Fallback to 'article' if empty
	const key = new Date().toISOString() + '-' + slug + '.mp3';

	// 3b. For the file content use the response
	const audioData = response instanceof Uint8Array ? response : Buffer.from(response.audio, 'base64');

	// 3c. Store the file in R2
	await c.env.R2_BUCKET.put(key, audioData);

	return c.json(response);
});

export default app;
