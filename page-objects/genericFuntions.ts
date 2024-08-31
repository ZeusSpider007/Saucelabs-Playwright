import { Locator, Page, expect } from "@playwright/test";

// Function to highlight an element using Locator
export async function highlightElement(element: Locator) {
    await element.evaluate((el) => {
      if (el instanceof HTMLElement) {
        el.style.outline = '1px solid red'; // Apply outline style
        setTimeout(() => (el.style.outline = ''), 1000); // Remove the outline after 1 second
      }
    });
  }

//Function to verify the URL

export async function validatePageUrl(page: Page, expectedUrl: string) {
  // Get the current URL
  const currentUrl = page.url();
  // Validate the current URL using an assertion
  expect(currentUrl).toBe(expectedUrl);
}
