import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
	testDir: './tests/e2e',
	timeout: 60000,
	expect: {
		timeout: 10000,
	},
	fullyParallel: false,
	retries: 0,
	reporter: [['list']],
	use: {
		baseURL: 'http://127.0.0.1:4173',
		trace: 'on-first-retry',
		screenshot: 'only-on-failure',
	},
	webServer: {
		command: 'npm run dev -- --host 127.0.0.1 --port 4173',
		url: 'http://127.0.0.1:4173',
		timeout: 120000,
		reuseExistingServer: true,
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
	],
})
