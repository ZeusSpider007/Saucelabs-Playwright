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


