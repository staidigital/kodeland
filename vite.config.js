import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	optimizeDeps: {
		exclude: [
			'svelte-codemirror-editor',
			'@codemirror/commands',
			'@codemirror/view',
			'@codemirror/state',
			'@codemirror/language',
			'@codemirror/lang-javascript',
			'@codemirror/theme-one-dark'
		]
	}
});
