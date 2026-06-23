import { expect, test as setup } from '@playwright/test';

setup.describe('Partner Portal - Login page', () => {
  setup.beforeEach(async ({ page }) => {
    await page.goto('https://portal-auth-us-east-2.uat.fastgamernetwork.com/login?client_id=k60144cohv4qmhk4qtskm7pse&redirect_uri=https%3A%2F%2Fpartners.uat.fastgamernetwork.com%2Fcallback&response_type=code&scope=openid%20email%20profile%20aws.cognito.signin.user.admin&nonce=5e4bed19f84ea5fbfee103a33b51abf229MGlh0nD&state=d683c23ef8ec42d7238c2cdc09c660aea1wEx62df&code_challenge=R8xW0WYhxvTEtaJkiX9gvJR7mRdeJyW0QNp4pTPJx5s&code_challenge_method=S256', { waitUntil: 'networkidle' });
  });

    setup('login with valid credentials and Super user state', async ({ page }) => {
        await page.fill('input[name="username"]', 'yuji.takahashi@arcadian.la');
            await page.fill('input[name="password"]', 'Arc@d1an2026!');
            await page.click('button[type="submit"]');
            await expect(page.getByText('Authenticator app MFA')).toBeVisible(); 
        
            // Pause here so you can do the MFA manually once
            await page.pause(); 
            
            // Workaround for Test suite Run: Click the "Log in" button and then click "Retry Sign-in"
            await page.getByRole('button', { name: /log in/i }).click(), ({ waitUntil: 'networkidle' });
            await page.getByRole('button', { name: /retry sign-in/i }).click(), ({ waitUntil: 'networkidle' });
        
            // Wait until you are fully logged in
            await page.waitForURL('https://partners.uat.fastgamernetwork.com/document-library', { waitUntil: 'networkidle' });
        
            // Save the signed-in state to a file
            await page.context().storageState({ path: 'playwright/.auth/superUser.json' });
    });

    setup('login with valid credentials and Org Admin state', async ({ page }) => {
        await page.fill('input[name="username"]', 'arc.apiqa+orgadmin@gmail.com');
            await page.fill('input[name="password"]', 'Arc@d1an2026!');
            await page.click('button[type="submit"]');
            await expect(page.getByText('Authenticator app MFA')).toBeVisible(); 
        
            // Pause here so you can do the MFA manually once
            await page.pause(); 
            
            // Workaround for Test suite Run: Click the "Log in" button and then click "Retry Sign-in"
            await page.getByRole('button', { name: /log in/i }).click(), ({ waitUntil: 'networkidle' });
            await page.getByRole('button', { name: /retry sign-in/i }).click(), ({ waitUntil: 'networkidle' });
        
            // Wait until you are fully logged in
            await page.waitForURL('https://partners.uat.fastgamernetwork.com/document-library', { waitUntil: 'networkidle' });
        
            // Save the signed-in state to a file
            await page.context().storageState({ path: 'playwright/.auth/orgAdmin.json' });
    });

    setup('login with valid credentials and Admin state', async ({ page }) => {
        await page.fill('input[name="username"]', 'arc.apiqa+admin@gmail.com');
            await page.fill('input[name="password"]', 'Arc@d1an2026!');
            await page.click('button[type="submit"]');
            await expect(page.getByText('Authenticator app MFA')).toBeVisible(); 
        
            // Pause here so you can do the MFA manually once
            await page.pause(); 
            
            // Workaround for Test suite Run: Click the "Log in" button and then click "Retry Sign-in"
            await page.getByRole('button', { name: /log in/i }).click(), ({ waitUntil: 'networkidle' });
            await page.getByRole('button', { name: /retry sign-in/i }).click(), ({ waitUntil: 'networkidle' });
        
            // Wait until you are fully logged in
            await page.waitForURL('https://partners.uat.fastgamernetwork.com/document-library', { waitUntil: 'networkidle' });
        
            // Save the signed-in state to a file
            await page.context().storageState({ path: 'playwright/.auth/admin.json' });
    });

    setup('login with valid credentials and Content OPS state', async ({ page }) => {
        await page.fill('input[name="username"]', 'arc.apiqa+content@gmail.com');
            await page.fill('input[name="password"]', 'Arc@d1an2026!');
            await page.click('button[type="submit"]');
            await expect(page.getByText('Authenticator app MFA')).toBeVisible(); 
        
            // Pause here so you can do the MFA manually once
            await page.pause(); 
            
            // Workaround for Test suite Run: Click the "Log in" button and then click "Retry Sign-in"
            await page.getByRole('button', { name: /log in/i }).click(), ({ waitUntil: 'networkidle' });
            await page.getByRole('button', { name: /retry sign-in/i }).click(), ({ waitUntil: 'networkidle' });
        
            // Wait until you are fully logged in
            await page.waitForURL('https://partners.uat.fastgamernetwork.com/document-library', { waitUntil: 'networkidle' });
        
            // Save the signed-in state to a file
            await page.context().storageState({ path: 'playwright/.auth/contentOps.json' });
    });

    setup('login with valid credentials and Content Reporting state', async ({ page }) => {
        await page.fill('input[name="username"]', 'arc.apiqa+reporting@gmail.com');
            await page.fill('input[name="password"]', 'Arc@d1an2026!');
            await page.click('button[type="submit"]');
            await expect(page.getByText('Authenticator app MFA')).toBeVisible(); 
        
            // Pause here so you can do the MFA manually once
            await page.pause(); 
            
            // Workaround for Test suite Run: Click the "Log in" button and then click "Retry Sign-in"
            await page.getByRole('button', { name: /log in/i }).click(), ({ waitUntil: 'networkidle' });
            await page.getByRole('button', { name: /retry sign-in/i }).click(), ({ waitUntil: 'networkidle' });
        
            // Wait until you are fully logged in
            await page.waitForURL('https://partners.uat.fastgamernetwork.com/document-library', { waitUntil: 'networkidle' });
        
            // Save the signed-in state to a file
            await page.context().storageState({ path: 'playwright/.auth/contentReporting.json' });
    });

});