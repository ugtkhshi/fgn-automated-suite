import { test, expect } from '@playwright/test';

test.describe('Partner Portal - Login page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://portal-auth-us-east-2.uat.fastgamernetwork.com/login?client_id=k60144cohv4qmhk4qtskm7pse&redirect_uri=https%3A%2F%2Fpartners.uat.fastgamernetwork.com%2Fcallback&response_type=code&scope=openid%20email%20profile%20aws.cognito.signin.user.admin&nonce=5e4bed19f84ea5fbfee103a33b51abf229MGlh0nD&state=d683c23ef8ec42d7238c2cdc09c660aea1wEx62df&code_challenge=R8xW0WYhxvTEtaJkiX9gvJR7mRdeJyW0QNp4pTPJx5s&code_challenge_method=S256', { waitUntil: 'networkidle' });
  });

  test('should display the login form', async ({ page }) => {
    await expect(page.locator('form')).toBeVisible();
    await expect(page.getByLabel('Email Address')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.getByRole('button', { name: /sign in|login/i })).toBeVisible();
  });

  test('should log in till user is in MFA state', async ({ page }) => {
    await page.fill('input[name="username"]', 'yuji.takahashi@arcadian.la');
    await page.fill('input[name="password"]', 'Arc@d1an2026!');
    await page.click('button[type="submit"]');
    await expect(page.getByText('Authenticator app MFA')).toBeVisible();
  });

  test('should navigate to user prompt page when back button is clicked during MFA state', async ({ page }) => {
    // First, reach MFA state
    await page.fill('input[name="username"]', 'yuji.takahashi@arcadian.la');
    await page.fill('input[name="password"]', 'Arc@d1an2026!');
    await page.click('button[type="submit"]');
    await expect(page.getByText('Authenticator app MFA')).toBeVisible();

    // Then test back button behavior
    await page.goBack();
    await page.waitForLoadState('networkidle');
    await expect(page.getByText(/you're still signed in|Sign in again/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /yuji\.takahashi@arcadian\.la/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /sign in as a different user/i })).toBeVisible();
  });
});

  

