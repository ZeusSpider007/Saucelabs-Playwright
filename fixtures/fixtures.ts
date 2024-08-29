import { test as base, Page } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';

// Extend Playwright's test with a custom fixture
type TestFixtures = {
  pageManager: PageManager;
};

// Create a test with custom fixtures
const test = base.extend<TestFixtures>({
  pageManager: async ({ page }, use) => {
    // Initialize PageManager with the page
    const pm = new PageManager(page);
    await use(pm);
    
  },
});

export { test };
