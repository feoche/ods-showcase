import { test, expect, Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SCREENSHOTS_DIR = path.resolve(__dirname, '__screenshots__', 'components.spec.ts');

/**
 * Utility: disable all CSS animations and transitions for deterministic screenshots.
 */
async function disableAnimations(page: Page) {
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
      }
      /* Hide the card header (label + copy button) — only the component itself should be in the screenshot */
      .component-card-header {
        display: none !important;
      }
    `,
  });
}

/**
 * Utility: slugify a string for use in filenames.
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const themes = ['theme-light', 'theme-dark'] as const;

for (const theme of themes) {
  test.describe(`Visual regression — ${theme}`, () => {
    test.describe.configure({ mode: 'serial' });

    let page: Page;

    test.beforeAll(async ({ browser }) => {
      page = await browser.newPage();

      // Set theme in localStorage before navigating so the app picks it up immediately
      await page.addInitScript((themeValue) => {
        localStorage.setItem('ods-showcase-theme', themeValue);
      }, theme);

      await page.goto('/');
      await page.waitForLoadState('networkidle');
      await disableAnimations(page);
      // Give components time to fully render (web components, icons, etc.)
      await page.waitForTimeout(2000);
    });

    test.afterAll(async () => {
      await page.close();
    });

    test(`screenshot all component cards [${theme}]`, async () => {
      // Ensure the page has rendered component cards
      await page.waitForSelector('.component-card', { timeout: 15000 });

      const cards = page.locator('.component-card');
      const count = await cards.count();

      // Sanity check: we expect at least some component cards
      if (count === 0) {
        throw new Error('No .component-card elements found on the page. The app may have failed to load.');
      }

      console.log(`\n🔍 Found ${count} component cards for theme "${theme}"`);

      // Collect all expected screenshot names to detect new components
      const expectedScreenshots: string[] = [];
      for (let i = 0; i < count; i++) {
        const card = cards.nth(i);
        const section = card.locator('xpath=ancestor::section[contains(@class,"component-section")]');
        const sectionId = (await section.getAttribute('id')) ?? 'unknown';
        const label = (await card.locator('.component-card-label').textContent()) ?? 'unlabeled';
        expectedScreenshots.push(`${theme}--${sectionId}--${slugify(label)}.png`);
      }

      // Detect new components without existing baselines
      const newComponents = expectedScreenshots.filter((name) => {
        const snapshotPath = path.join(SCREENSHOTS_DIR, name);
        return !fs.existsSync(snapshotPath);
      });

      if (newComponents.length > 0) {
        console.log(`\n🆕 ${newComponents.length} NEW component(s) detected without baseline screenshots:`);
        newComponents.forEach((name) => console.log(`   • ${name}`));
        console.log(`   Run "pnpm test:visual:update" to generate baselines.\n`);
      }

      // Detect orphaned screenshots (components removed from the showcase)
      if (fs.existsSync(SCREENSHOTS_DIR)) {
        const existingFiles = fs.readdirSync(SCREENSHOTS_DIR).filter(
          (f) => f.startsWith(`${theme}--`) && f.endsWith('.png')
        );
        const orphaned = existingFiles.filter((f) => !expectedScreenshots.includes(f));
        if (orphaned.length > 0) {
          console.log(`\n⚠️  ${orphaned.length} orphaned screenshot(s) found (component may have been removed):`);
          orphaned.forEach((name) => console.log(`   • ${name}`));
          console.log(`   Consider deleting these manually.\n`);
        }
      }

      for (let i = 0; i < count; i++) {
        const card = cards.nth(i);

        // Get section id from parent section
        const section = card.locator('xpath=ancestor::section[contains(@class,"component-section")]');
        const sectionId = (await section.getAttribute('id')) ?? 'unknown';

        // Get label from card header
        const label = (await card.locator('.component-card-label').textContent()) ?? 'unlabeled';

        const screenshotName = `${theme}--${sectionId}--${slugify(label)}.png`;

        console.log(`📸 [${i + 1}/${count}] ${sectionId} — "${label}" (${theme})`);

        // Scroll into view to ensure it's rendered
        await card.scrollIntoViewIfNeeded();
        await page.waitForTimeout(150);

        await expect(card).toHaveScreenshot(screenshotName, {
          maxDiffPixelRatio: 0.01,
          animations: 'disabled',
        });
      }
    });
  });
}

