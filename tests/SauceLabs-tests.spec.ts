//import { test, expect } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";
import { test } from '../fixtures/fixtures'

test.describe("Sauce Demo Test Suite", () => {


  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
  });

  test("Verification of Login Page Components", async ({ pageManager }) => {

    await pageManager.onLoginpage().verifyLoginPageHeaderText();
    await pageManager.onLoginpage().verifyLoginPageUsernameField();
    await pageManager.onLoginpage().verifyLoginPagePasswordField();
    await pageManager.onLoginpage().verifyLoginButton();
    await pageManager.onLoginpage().verifyLoginCredpanel();
    await pageManager.onLoginpage().verifyPassCredpanel();
    await pageManager.onLoginpage().verifyCredentialDomPanel();

  });


  test("Verify Login using Standard User", async ({ pageManager }) => {

    await pageManager.onLoginpage().loginUsingStandardUser();
    await pageManager.onLoginpage().validateSucessfulLogin();
  })


});
