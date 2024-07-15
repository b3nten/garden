import { defineConfig, Plugin } from 'vite';
import vono from 'vonojs';
import { CloudflareAdaptor } from "vonojs/adaptor-cloudflare"
import tailwindcss from '@tailwindcss/vite';
import { marked } from 'marked';
import gray from "gray-matter"

function markdown(): Plugin {
	return {
		name: 'vite-plugin-marked',
		transform(src, id) {
			if(id.endsWith('.md')) {
				const result = gray(src);
				return `export const content = ${JSON.stringify(marked.parse(result.content))}; export const metadata = ${JSON.stringify(result.data)};`;
			}
		}
	};
}

export default defineConfig({
	plugins: [
		tailwindcss(),
		markdown(),
		vono({
			clientEntry: './src/🏠entry.ts',
			serverEntry: './src/server.ts',
			adaptor: new CloudflareAdaptor(),
			exclude: [/\.md$/]
		})
	]
});
