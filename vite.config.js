import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
	plugins: [solid()],
	server: {
		port: 4000,
		open: true,
	},
	build: {
		target: 'esnext',
	},
})
