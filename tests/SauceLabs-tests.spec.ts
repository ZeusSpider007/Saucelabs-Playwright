import { test } from '../fixtures/fixtures'
import { PageManager } from '../page-objects/pageManager';

test.describe("Sauce Demo Test Suite", () => {


  test.beforeEach(async ({ page }) => {
    await page.goto("/");
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


  test("Verify Login using Standard User and Validate Main Page Components", async ({ pageManager }) => {

    await pageManager.onLoginpage().loginUsingStandardUser();
    await pageManager.onLoginpage().validateSucessfulLogin();
    await pageManager.onMainPage().verifyMenuButton();
    await pageManager.onMainPage().verifycartmenubutton();
    await pageManager.onMainPage().verifyfilterdropdowncontainer();
    await pageManager.onMainPage().verifyfootersocialmedialinks();
  });


  test("Verify the Products in the Available Inventory",async({pageManager})=>{

    await pageManager.onLoginpage().loginUsingStandardUser();
    await pageManager.onMainPage().verifyInventoryItems();

  });


});
