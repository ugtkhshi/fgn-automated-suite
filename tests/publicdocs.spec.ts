import { test, expect } from '@playwright/test';

test.describe('Partner Portal - Public Documents', () => {

  test('should display public documents table', async ({ page }) => {
    await page.goto('https://partners.uat.fastgamernetwork.com/public/documents', { waitUntil: 'networkidle' });

    await expect(page.getByText('Partner Portal')).toBeVisible();
    await expect(page.getByText('Public Documents')).toBeVisible();

    const table = page.locator('table');
    await expect(table).toBeVisible();
  });

  test('should verify document metadata', async ({ page }) => {
    await page.goto('https://partners.uat.fastgamernetwork.com/public/documents', { waitUntil: 'networkidle' });

    const firstRow = page.locator('tbody tr').nth(0);

    await expect(firstRow).toContainText('Sample Active Public');
    await expect(firstRow).toContainText('40.6 MB');
    await expect(firstRow).toContainText('2026-05-29');
    await expect(firstRow).toContainText('v1');

    const secondRow = page.locator('tbody tr').nth(1);

    await expect(secondRow).toContainText('500.2 KB');
    await expect(secondRow).toContainText('2026-05-08');
    await expect(secondRow).toContainText('v1');
  });

  test('should open document preview', async ({ page }) => {
    await page.goto('https://partners.uat.fastgamernetwork.com/public/documents', { waitUntil: 'networkidle' });

    const viewButton = page.getByRole('button', { name: /view/i }).first();

    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      viewButton.click()
    ]);

    await newPage.waitForLoadState();

    await expect(newPage).toHaveURL(/\.pdf/i);
  });

  test('should download document', async ({ page }) => {
    await page.goto('https://partners.uat.fastgamernetwork.com/public/documents', { waitUntil: 'networkidle' });

    const downloadButton = page.getByRole('button', { name: /download/i }).first();

    const download = await Promise.all([
      page.waitForEvent('download'),
      downloadButton.click()
    ]);

    const suggestedFilename = await download[0].suggestedFilename();

    expect(suggestedFilename).toContain('.pdf');
  });

  test('should display login button', async ({ page }) => {
    await page.goto('https://partners.uat.fastgamernetwork.com/public/documents', { waitUntil: 'networkidle' });

    const loginButton = page.getByRole('button', { name: /log in/i });

    await expect(loginButton).toBeVisible();
    await expect(loginButton).toBeEnabled();
  });

  test('should navigate to login page when login button is clicked', async ({ page }) => {
    await page.goto('https://partners.uat.fastgamernetwork.com/public/documents', { waitUntil: 'networkidle' });

    const loginButton = page.getByRole('button', { name: /log in/i });

    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle' }),
      loginButton.click()
    ]);

    await expect(page).toHaveURL('https://partners.uat.fastgamernetwork.com/login');
  });
});