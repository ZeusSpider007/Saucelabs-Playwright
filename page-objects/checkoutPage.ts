import { Locator, Page, expect } from "@playwright/test";
import * as utils from "./genericFuntions"
import { faker } from '@faker-js/faker';
import {CartPage} from './cartPage';

export class CheckoutPage {

    readonly page: Page;
    readonly cartpage: CartPage
    readonly firstNameTxtBox: Locator;
    readonly lastNameTxtBox: Locator;
    readonly zipCodeTxtBox: Locator;
    readonly continueButton: Locator;
    readonly checkoutPageOneTitleLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartpage = new CartPage(this.page);

        // Define locators
        this.firstNameTxtBox = this.page.getByPlaceholder('First Name');
        this.lastNameTxtBox = this.page.getByPlaceholder('Last Name');
        this.zipCodeTxtBox = this.page.getByPlaceholder('Zip/Postal Code');
        this.continueButton = this.page.locator('#continue');
        this.checkoutPageOneTitleLocator = this.page.locator('.title');
    }


    async verifyCheckoutPageOneElements() {

        //verify URL
        const ExpectedURL = "https://www.saucedemo.com/checkout-step-one.html";
        await utils.validatePageUrl(this.page,ExpectedURL)

        //Verify Title
        const checkoutPageOneTitleTxt = "Checkout: Your Information";
        await expect(this.checkoutPageOneTitleLocator).toBeVisible();
        const extractedTxtFromTitle = await this.checkoutPageOneTitleLocator.textContent();
        expect(extractedTxtFromTitle).toBe(checkoutPageOneTitleTxt);

        //First Name Text Box
        await expect(this.firstNameTxtBox).toBeVisible();
        await expect(this.firstNameTxtBox).toBeEditable();

        // Verify Last Name Text Box
        await expect(this.lastNameTxtBox).toBeVisible();
        await expect(this.lastNameTxtBox).toBeEditable();

        // Verify Zip Code Text Box
        await expect(this.zipCodeTxtBox).toBeVisible();
        await expect(this.zipCodeTxtBox).toBeEditable();

        // Verify Continue Button
        await expect(this.continueButton).toBeVisible();
        await expect(this.continueButton).toBeEnabled();
        await expect(this.continueButton).toHaveCSS('background-color', 'rgb(61, 220, 145)');
    }

    async enterPersonalDetailsOnCheckoutPage() {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const zipCode = faker.location.zipCode();

        // Use the locators defined in the constructor
        await this.firstNameTxtBox.fill(firstName);
        await this.lastNameTxtBox.fill(lastName);
        await this.zipCodeTxtBox.fill(zipCode);
    }

    async clickOnContinueButton(){

        const ContinueButton = this.page.locator('#continue');
        await ContinueButton.click();
    }

    async fetchSubtotalValue(): Promise<number> {
        // Locate the element containing the subtotal
        const subtotalElement = this.page.locator('.summary_subtotal_label');
        
        // Fetch the text content of the element
        const textContent = await subtotalElement.textContent();

        if (textContent) {
            // Extract the numeric value from the text content
            // Assuming the format is always "Item total: $value"
            const match = textContent.match(/Item total:\s*\$([\d,.]+)/);

            if (match) {
                // Parse the value to float
                const value = parseFloat(match[1].replace(',', ''));
                return value;
            } else {
                throw new Error('Subtotal value not found in text content');
            }
        } else {
            throw new Error('Text content is empty or null');
        }
    }


     async fetchTaxValue(): Promise<number> {
        // Locate the element containing the tax information
        const taxElement = this.page.locator('.summary_tax_label');
        
        // Fetch the text content of the element
        const textContent = await taxElement.textContent();

        if (textContent) {
            // Extract the numeric value from the text content
            // Assuming the format is always "Tax: $value"
            const match = textContent.match(/Tax:\s*\$([\d,.]+)/);

            if (match) {
                // Parse the value to float
                const value = parseFloat(match[1].replace(',', ''));
                return value;
            } else {
                throw new Error('Tax value not found in text content');
            }
        } else {
            throw new Error('Text content is empty or null');
        }
    }

    async fetchTotalValue(): Promise<number> {
        // Locate the element containing the total amount
        const totalElement = this.page.locator('.summary_total_label');
        
        // Fetch the text content of the element
        const textContent = await totalElement.textContent();

        if (textContent) {
            // Extract the numeric value from the text content
            // Assuming the format is always "Total: $value"
            const match = textContent.match(/Total:\s*\$([\d,.]+)/);

            if (match) {
                // Parse the value to float
                const value = parseFloat(match[1].replace(',', ''));
                return value;
            } else {
                throw new Error('Total value not found in text content');
            }
        } else {
            throw new Error('Text content is empty or null');
        }
    }


    async validateTotalPriceOnFinalCheckoutPage(){

     let TotalSumOfInventoryItems = await this.cartpage.fetchTotalAmountFromCartItems();
     let Item_total = await this.fetchSubtotalValue();
     expect(TotalSumOfInventoryItems).toBe(Item_total);

     let Tax_Value = await this.fetchTaxValue();
     let TotalSum = Item_total+Tax_Value;
     expect(TotalSum).toBe(await this.fetchTotalValue())

    }

    async clickonFinishButton(){

        const FinishButton = this.page.locator('#finish');
        await utils.highlightElement(FinishButton);
        await expect(FinishButton).toBeVisible();
        await expect(FinishButton).toBeEnabled();
        await expect(FinishButton).toHaveCSS('background-color', "rgb(61, 220, 145)");
        FinishButton.click();

    }


    async verifyOrderisPlacedSucessfully(){

        await this.clickonFinishButton();
        const OrderPlacedImg = this.page.locator("//img[@alt='Pony Express']");
        await OrderPlacedImg.waitFor({ state: 'visible', timeout: 10000 });
        await expect(OrderPlacedImg).toBeVisible();

        const OrderPlacedTxt1 = this.page.locator('.complete-header');
        const OrderPlacedTextonDOM = await OrderPlacedTxt1.textContent();
        expect(OrderPlacedTextonDOM).toBe('Thank you for your order!');

        const Dispatchtxt = this.page.locator('.complete-text');
        const DispatchTextonDOM = await Dispatchtxt.textContent();
        expect(DispatchTextonDOM).toBe('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
    }
}