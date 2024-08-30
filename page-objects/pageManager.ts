import { Page } from "@playwright/test";
import { LoginPage } from "./loginPage";
import { MainPage } from "./mainPage";

export class PageManager {
  private readonly page: Page;
  private readonly loginPage: LoginPage;
  private readonly mainpage: MainPage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.mainpage = new MainPage(this.page);
  }

  onLoginpage() {
    return this.loginPage;
  }

  onMainPage(){
    return this.mainpage;
  }
}
