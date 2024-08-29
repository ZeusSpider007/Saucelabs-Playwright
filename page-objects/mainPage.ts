import { Page, expect } from "@playwright/test";
import * as utils from "./genericFuntions"

export class MainPage {
    readonly page: Page

    constructor(page: Page) {
        page = this.page;
    }


    async verifyMenuButton()
{
     const MenuButton = this.page.getByRole('button', { name: 'Open Menu' })
     await MenuButton.click();
}





}