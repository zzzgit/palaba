import { test, expect } from '@playwright/test';

function attachRuntimeMonitors(page) {
  const runtime = {
    pageErrors: [],
    consoleErrors: [],
    requestFailures: [],
    httpErrors: []
  };

  page.on('pageerror', (error) => {
    runtime.pageErrors.push(error.message);
  });

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      runtime.consoleErrors.push(msg.text());
    }
  });

  page.on('requestfailed', (request) => {
    runtime.requestFailures.push({
      url: request.url(),
      method: request.method(),
      failure: request.failure()?.errorText || 'Unknown request failure'
    });
  });

  page.on('response', (response) => {
    if (response.status() >= 400) {
      runtime.httpErrors.push({
        status: response.status(),
        url: response.url(),
        method: response.request().method()
      });
    }
  });

  return runtime;
}

function stringifyRuntimeErrors(runtime) {
  return [
    ...runtime.pageErrors.map((message) => `[pageerror] ${message}`),
    ...runtime.consoleErrors.map((message) => `[console.error] ${message}`),
    ...runtime.requestFailures.map((entry) => `[requestfailed] ${entry.method} ${entry.url} -> ${entry.failure}`),
    ...runtime.httpErrors.map((entry) => `[http ${entry.status}] ${entry.method} ${entry.url}`)
  ];
}

test('full walkthrough across Dashboard / Customers / Sales without runtime failures', async ({ page }) => {
  const runtime = attachRuntimeMonitors(page);

  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  await expect(page.getByText('Welcome to your admin dashboard')).toBeVisible();
  await expect(page.locator('.stats-grid .stat-card')).toHaveCount(4);
  await expect(page.locator('canvas')).toHaveCount(3);

  await page.getByText('Customers', { exact: true }).first().click();
  await expect(page.getByRole('heading', { name: 'Customer Management' })).toBeVisible();
  await expect(page.getByPlaceholder('Search customers...')).toBeVisible();
  await expect(page.getByText('Loading customers...')).toHaveCount(0);
  const customerRows = page.locator('table tbody tr');
  const customerCount = await customerRows.count();
  expect(customerCount).toBeGreaterThan(0);

  const firstCustomerEmail = await customerRows.first().locator('td').nth(2).innerText();
  await page.getByPlaceholder('Search customers...').fill(firstCustomerEmail);
  await expect(customerRows).toHaveCount(1);
  await page.getByPlaceholder('Search customers...').fill('');

  await page.getByRole('button', { name: '+ Add Customer' }).click();
  await expect(page.getByRole('heading', { name: 'Add New Customer' })).toBeVisible();
  await page.getByRole('button', { name: 'Cancel' }).click();
  await expect(page.getByRole('heading', { name: 'Add New Customer' })).toHaveCount(0);

  await page.getByText('Sales', { exact: true }).first().click();
  await expect(page.getByRole('heading', { name: 'Sales Management' })).toBeVisible();
  await expect(page.getByText('Track and manage your sales transactions')).toBeVisible();
  await expect(page.getByText('Loading sales...')).toHaveCount(0);
  await expect(page.locator('.stats-grid .stat-card')).toHaveCount(3);
  const salesRows = page.locator('table tbody tr');
  const salesCount = await salesRows.count();
  expect(salesCount).toBeGreaterThan(0);

  await page.getByPlaceholder('Search by customer or order ID...').fill('1001');
  await expect(salesRows).toHaveCount(1);
  await page.getByPlaceholder('Search by customer or order ID...').fill('');

  await page.locator('select').last().selectOption('processing');
  const processingCount = await salesRows.count();
  expect(processingCount).toBeGreaterThan(0);
  expect(processingCount).toBeLessThanOrEqual(salesCount);
  await page.locator('select').last().selectOption('all');

  await page.getByText('Dashboard', { exact: true }).first().click();
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

  const runtimeFindings = stringifyRuntimeErrors(runtime);
  expect(runtimeFindings, runtimeFindings.join('\n')).toEqual([]);
});
