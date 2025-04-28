import {test} from '@playwright/test';

export class MainPage {
    constructor(page) {
        //super(page);
        this.page = page;
        this.findBugsButton = page.getByRole('link', { name: 'Find Bugs' });
        this.closeStart = page.locator(`div[id='TourTip0'] button[type='button']`);

    }

    
    async open () {
        await this.page.goto('/');
        await this.closeStart.click();
        await this.findBugsButton.click();
    }



}