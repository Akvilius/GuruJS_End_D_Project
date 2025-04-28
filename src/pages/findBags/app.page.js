import { MainPage, FindBagsPage ,ProductPage} from './index';

export class App {
 
    constructor(page) {
        this.page = page;
        this.mainPage = new MainPage(page);
        this.findBagsPage = new FindBagsPage(page);
        this.productPage = new ProductPage(page);

        this.popUp = page.locator('#bug-popup');
    }
    
    async waitForPopUp(){
        await test.step('Ожидать загрузки поп-апа с информацией по багу', async() => {
            await this.popUp.waitFor({ state: 'visible' });
        });
    }
}