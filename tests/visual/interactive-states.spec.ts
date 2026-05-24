import { test, expect, Page } from '@playwright/test';

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
 * Interactive state definitions: components that need a click/hover to reveal their open state.
 */
interface InteractiveTest {
  name: string;
  sectionId: string;
  /** Selector for the trigger button/element to click */
  triggerSelector: string;
  /** 'hover' for tooltip-like, 'click' for dialogs */
  action: 'click' | 'hover';
  /** Close mechanism after screenshot */
  closeMethod: 'escape' | 'click-backdrop' | 'none';
}

const interactiveTests: InteractiveTest[] = [
  // Modal
  {
    name: 'modal--default-open',
    sectionId: 'modal',
    triggerSelector: '#modal .component-card:first-child button:not(.component-card-copy):visible',
    action: 'click',
    closeMethod: 'escape',
  },
  // Drawer
  {
    name: 'drawer--default-open',
    sectionId: 'drawer',
    triggerSelector: '#drawer .component-card:first-child button:not(.component-card-copy):visible',
    action: 'click',
    closeMethod: 'escape',
  },
  // Popover
  {
    name: 'popover--default-open',
    sectionId: 'popover',
    triggerSelector: '#popover .component-card:first-child button:not(.component-card-copy):visible',
    action: 'click',
    closeMethod: 'escape',
  },
  // Tooltip (hover)
  {
    name: 'tooltip--default-hover',
    sectionId: 'tooltip',
    triggerSelector: '#tooltip .component-card:first-child button:not(.component-card-copy):visible',
    action: 'hover',
    closeMethod: 'none',
  },
  // Toaster
  {
    name: 'toaster--default-triggered',
    sectionId: 'toaster',
    triggerSelector: '#toaster .component-card:first-child button:not(.component-card-copy):visible',
    action: 'click',
    closeMethod: 'none',
  },
];

const themes = ['theme-light', 'theme-dark'] as const;

for (const theme of themes) {
  test.describe(`Interactive states — ${theme}`, () => {
    test.describe.configure({ mode: 'serial' });

    let page: Page;

    test.beforeAll(async ({ browser }) => {
      page = await browser.newPage();

      await page.addInitScript((themeValue) => {
        localStorage.setItem('ods-showcase-theme', themeValue);
      }, theme);

      await page.goto('/');
      await page.waitForLoadState('networkidle');
      await page.waitForSelector('.component-card', { timeout: 15000 });
      await disableAnimations(page);
      await page.waitForTimeout(2000);
    });

    test.afterAll(async () => {
      await page.close();
    });

    for (const interactiveTest of interactiveTests) {
      test(`${theme}--${interactiveTest.name}`, async () => {
        console.log(`📸 ${interactiveTest.sectionId} — "${interactiveTest.name}" (${theme})`);

        // Scroll the section into view
        const section = page.locator(`#${interactiveTest.sectionId}`);
        await section.scrollIntoViewIfNeeded();
        await page.waitForTimeout(300);

        // Perform action
        const trigger = page.locator(interactiveTest.triggerSelector).first();
        await trigger.scrollIntoViewIfNeeded();
        await page.waitForTimeout(100);

        if (interactiveTest.action === 'hover') {
          await trigger.hover();
        } else {
          await trigger.click();
        }

        // Wait for overlay/content to appear
        await page.waitForTimeout(500);
        await disableAnimations(page);
        await page.waitForTimeout(200);

        // Take full-page screenshot (to capture portals/overlays)
        await expect(page).toHaveScreenshot(`${theme}--${interactiveTest.name}.png`, {
          maxDiffPixelRatio: 0.01,
          animations: 'disabled',
          fullPage: false,
        });

        // Close
        if (interactiveTest.closeMethod === 'escape') {
          await page.keyboard.press('Escape');
          await page.waitForTimeout(500);
        } else if (interactiveTest.closeMethod === 'none') {
          // Move mouse away for hover-based tests
          await page.mouse.move(0, 0);
          await page.waitForTimeout(500);
        }
      });
    }
  });
}
