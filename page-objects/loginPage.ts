import { Page, expect } from "@playwright/test";
import * as utils from "./genericFuntions"
import exp from "constants";

export class LoginPage {

  readonly page: Page
  readonly STANDARD_USER: string = 'standard_user';
  readonly LOCKED_OUT_USER: string = 'locked_out_user';
  readonly PASSWORD: string = 'secret_sauce';

  constructor(page: Page) {
    this.page = page;
  }

  async verifyLoginPageHeaderText() {
    const headerLogo = this.page.getByText("Swag Labs");
    await utils.highlightElement(headerLogo);
    await expect(headerLogo).toBeVisible();
  }

  async verifyLoginPageUsernameField() {

    const UsernameTextField = this.page.locator('[data-test="username"]');
    await utils.highlightElement(UsernameTextField);
    await expect(UsernameTextField).toBeVisible();
    await expect(UsernameTextField).toBeEditable();
  }

  async verifyLoginPagePasswordField() {

    const passwordTextField = this.page.locator('[data-test="password"]');
    await utils.highlightElement(passwordTextField);
    await expect(passwordTextField).toBeVisible();
    await expect(passwordTextField).toBeEditable();
  }


  async verifyLoginButton() {
    const loginButton = this.page.locator('[data-test="login-button"]');
    await utils.highlightElement(loginButton);
    await expect(loginButton).toBeEnabled();
    await expect(loginButton).toHaveCSS('background-color', "rgb(61, 220, 145)");

  }

  async verifyLoginCredpanel() {
    const loginCredentialsUsernames = this.page.locator('[data-test="login-credentials"]');
    await utils.highlightElement(loginCredentialsUsernames);
    await expect(loginCredentialsUsernames).toBeVisible();
  }

  async verifyPassCredpanel() {
    const loginCredentialsPass = this.page.locator('[data-test="login-password"]');
    await utils.highlightElement(loginCredentialsPass);
    await expect(loginCredentialsPass).toBeVisible();
  }

  async verifyCredentialDomPanel() {
    const credentialsdom = this.page.locator('[data-test="login-credentials-container"] div').first();
    await utils.highlightElement(credentialsdom);
    expect(credentialsdom).toHaveCSS("background-color", "rgb(19, 35, 34)");
  }

  async clickLoginButton() {
    const loginButton = this.page.locator('[data-test="login-button"]');
    await loginButton.click();

  }
  async loginUsingStandardUser() {

    const UsernameTextField = this.page.locator('[data-test="username"]');
    await utils.highlightElement(UsernameTextField);
    await UsernameTextField.fill(this.STANDARD_USER);

    const passwordTextField = this.page.locator('[data-test="password"]');
    await utils.highlightElement(passwordTextField);
    await passwordTextField.fill(this.PASSWORD);

    await this.clickLoginButton();

  }

  async validateSucessfulLogin() {
    
    const HeaderTxt = this.page.locator('.app_logo');
    await expect(HeaderTxt).toBeVisible();
    const ExpectedURL = "https://www.saucedemo.com/inventory.html";
    await utils.validatePageUrl(this.page,ExpectedURL);

  }

}
