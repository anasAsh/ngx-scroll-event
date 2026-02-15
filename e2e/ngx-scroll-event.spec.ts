import { test, expect } from '@playwright/test';

test.describe('ngx-scroll-event directive', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('app-root .scroll-container', { state: 'visible' });
  });

  test('should show idle before any scroll', async ({ page }) => {
    const status = page.getByTestId('scroll-status');
    await expect(status).toContainText('idle');
  });

  test('should show top when scrolled to top', async ({ page }) => {
    const container = page.locator('.scroll-container');
    await container.evaluate((el) => {
      el.scrollTop = 0;
      el.dispatchEvent(new Event('scroll'));
    });
    const status = page.getByTestId('scroll-status');
    await expect(status).toContainText('top', { timeout: 3000 });
  });

  test('should update status to middle when scrolled down', async ({ page }) => {
    const container = page.locator('.scroll-container');
    await container.evaluate((el) => {
      el.scrollTop = 100;
      el.dispatchEvent(new Event('scroll'));
    });
    const status = page.getByTestId('scroll-status');
    await expect(status).toContainText('middle', { timeout: 3000 });
  });

  test('should update status to bottom when scrolled to bottom', async ({ page }) => {
    const container = page.locator('.scroll-container');
    await container.evaluate((el) => {
      el.scrollTop = el.scrollHeight - el.clientHeight;
      el.dispatchEvent(new Event('scroll'));
    });
    const status = page.getByTestId('scroll-status');
    await expect(status).toContainText('bottom', { timeout: 3000 });
  });

  test('should have scrollable content', async ({ page }) => {
    const content = page.locator('.scroll-content');
    await expect(content).toBeVisible();
    const lineCount = await page.locator('.scroll-content p').count();
    expect(lineCount).toBeGreaterThanOrEqual(10);
  });
});
