import { Page, expect } from "@playwright/test";
import * as utils from "./genericFuntions"
import exp from "constants";

export class MainPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page;
    }


    async verifyMenuButton() {
        //verify presence of Menu button
        const MenuButton = this.page.getByRole('button', { name: 'Open Menu' });
        await utils.highlightElement(MenuButton);
        await expect(MenuButton).toBeVisible();
        await MenuButton.click();

        //verify the options present in the menu button
        const MenuitemList = this.page.locator('.bm-item-list a');
        const itemTexts = await MenuitemList.allInnerTexts();
        const expectedValues = ['All Items', 'About', 'Logout', 'Reset App State'];
        expect(itemTexts.length).toBe(expectedValues.length);

        //fetching all the inner texts from the menu and comparing with the expected value lists.
        itemTexts.forEach((text, index) => {
            expect(text.trim()).toBe(expectedValues[index]);

        });

        const CloseMenuButton = this.page.getByRole('button', { name: 'Close Menu' });
        await CloseMenuButton.click();
    }


    async verifycartmenubutton() {

        const CartMenubutton = this.page.locator('#react-burger-cross-btn');
        await expect(CartMenubutton).toBeVisible();
    }


    async verifyfilterdropdowncontainer() {

        const FilterContainer = this.page.locator('.select_container');
        await utils.highlightElement(FilterContainer);
        await expect(FilterContainer).toBeVisible();
        await FilterContainer.click();

        const FilterContaineritemList = this.page.locator("//select[@class='product_sort_container']/option");
        const itemTexts = await FilterContaineritemList.allInnerTexts();
        const expectedValues = ['Name (A to Z)', 'Name (Z to A)', 'Price (low to high)', 'Price (high to low)'];
        expect(itemTexts.length).toBe(expectedValues.length);

        //fetching all the inner texts and comparing with the expected value lists.
        itemTexts.forEach((text, index) => {
            expect(text.trim()).toBe(expectedValues[index]);

        });


    }


    async verifyfootersocialmedialinks() {

        const SocialMediaPanel = this.page.locator('.social');
        await expect(SocialMediaPanel).toBeVisible();

        // Locate all anchor tags within .social li
        const links = await this.page.locator('.social li a').evaluateAll((anchors) =>
            anchors.map(anchor => anchor.getAttribute('href'))
        );

        // Define the expected href values
        const expectedLinks = [
            'https://twitter.com/saucelabs',
            'https://www.facebook.com/saucelabs',
            'https://www.linkedin.com/company/sauce-labs/'
        ];

        // Assert that the number of fetched links matches the expected values
        expect(links.length).toBe(expectedLinks.length);

        // Compare each fetched href with the expected value
        links.forEach((link, index) => {
            expect(link).toBe(expectedLinks[index]);
        });


    }



    async verifyInventoryItems(){

        

        const inventoryItems = this.page.locator("//div[@class='inventory_item']");
        const itemCount = await inventoryItems.count();
        expect(itemCount).toBe(6);

        const InventoryitemListTitle = this.page.locator("div[class='inventory_item_name ']");
        const itemTexts = await InventoryitemListTitle.allInnerTexts();
        const expectedValues = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt', 'Sauce Labs Fleece Jacket', 'Sauce Labs Onesie','Test.allTheThings() T-Shirt (Red)'];
        expect(itemTexts.length).toBe(expectedValues.length);

        //fetching all the inner texts and comparing with the expected value lists.
        itemTexts.forEach((text, index) => {
            expect(text.trim()).toBe(expectedValues[index]);

        });

    }

}