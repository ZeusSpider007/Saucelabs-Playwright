import { test, expect } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";

test.describe("Sauce Demo Test Suite", () => {


  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
  });

  test("Verification of Login Page Components", async ({ page }) => {
    const pm = new PageManager(page);

    await pm.onLoginpage().verifyLoginPageHeaderText()
    await pm.onLoginpage().verifyLoginPageUsernameField()
    await pm.onLoginpage().verifyLoginPagePasswordField()
    await pm.onLoginpage().verifyLoginButton()
    await pm.onLoginpage().verifyLoginCredpanel()
    await pm.onLoginpage().verifyPassCredpanel()
    await pm.onLoginpage().verifyCredentialDomPanel()



  });

});
