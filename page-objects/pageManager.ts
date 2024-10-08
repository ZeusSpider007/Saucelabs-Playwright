import { Page } from "@playwright/test";
import { LoginPage } from "./loginPage";
import { MainPage } from "./mainPage";
import { CartPage } from "./cartPage";
import { CheckoutPage} from './checkoutPage'

export class PageManager {
  private readonly page: Page;
  private readonly loginPage: LoginPage;
  private readonly mainpage: MainPage;
  private readonly cartpage: CartPage;
  private readonly checkoutpage : CheckoutPage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.mainpage = new MainPage(this.page);
    this.cartpage = new CartPage(this.page);
    this.checkoutpage = new CheckoutPage(this.page);
  }

  onLoginpage() {
    return this.loginPage;
  }

  onMainPage(){
    return this.mainpage;
  }

  onCartPage(){
    return this.cartpage;
  }

  onCheckoutPage(){
    return this.checkoutpage;
  }
}


