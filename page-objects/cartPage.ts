import { Page, expect } from "@playwright/test";
import * as utils from "./genericFuntions"
import exp from "constants";

export class CartPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page;
        
    }


    async fetchTotalAmountFromCartItems(): Promise <number> {

        const priceElements = this.page.locator('.inventory_item_price');
        // Fetch all price texts
        const priceTexts = await priceElements.allTextContents();
        
        let totalSum: number = 0;
        
        // Loop through each price text and add to the total sum
        for (const priceText of priceTexts) {
            const priceValue = parseFloat(priceText.replace('$', '').trim());
            totalSum += priceValue; // Accumulate the total sum
        }       

        return totalSum;
    }


    async validateCartPageButtonElements(){

        const ExpectedURL = "https://www.saucedemo.com/cart.html";
        await utils.validatePageUrl(this.page,ExpectedURL)

        const MyCartTitle = this.page.locator('.title');
        await utils.highlightElement(MyCartTitle);
        await expect(MyCartTitle).toBeVisible();
        await expect(MyCartTitle).toBeEnabled();

        const CartQuantityLabel = this.page.locator('.cart_quantity_label');
        await utils.highlightElement(CartQuantityLabel);
        await expect(CartQuantityLabel).toBeVisible();
        await expect(CartQuantityLabel).toBeEnabled();
        
        const CartDescLabel = this.page.locator('.cart_desc_label');
        await utils.highlightElement(CartDescLabel);
        await expect(CartDescLabel).toBeVisible();
        await expect(CartDescLabel).toBeEnabled();

        const ContinueShoppingButton = this.page.locator('#continue-shopping');
        await utils.highlightElement(ContinueShoppingButton);
        await expect(ContinueShoppingButton).toBeVisible();
        await expect(ContinueShoppingButton).toBeEnabled();

        const BackArrowInContinueShoppingbutton = this.page.locator("//button[@id='continue-shopping']/img[@alt='Go back']");
        await utils.highlightElement(BackArrowInContinueShoppingbutton);
        await expect(BackArrowInContinueShoppingbutton).toBeVisible();
        await expect(BackArrowInContinueShoppingbutton).toBeEnabled();

        const CheckoutButton = this.page.locator('#checkout');
        await utils.highlightElement(CheckoutButton);
        await expect(CheckoutButton).toBeVisible();
        await expect(CheckoutButton).toBeEnabled();
        await expect(CheckoutButton).toHaveCSS('background-color', "rgb(61, 220, 145)");

    }


    async ClickonCheckoutButton(){
        const CheckoutButton = this.page.locator('#checkout');
        await CheckoutButton.click();
    }
    



}