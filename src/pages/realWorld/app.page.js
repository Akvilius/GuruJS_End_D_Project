import { MainPage, RegPage, YoufeedPage, EditorPage, ArticlePage, SettingPage, LoginPage } from './index';

export class App {
 
    constructor(page) {
        this.page = page;

        this.mainPage = new MainPage(page);
        this.regPage = new RegPage(page);
        this.loginPage = new LoginPage(page);
        this.youfeedPage = new YoufeedPage(page);
        this.editorPage = new EditorPage(page);
        this.articlePage = new ArticlePage(page);
        this.settingPage = new SettingPage(page);
    }
    
   // async waitForPopUp(){
    //    await test.step('Ожидать загрузки поп-апа с информацией по багу', async() => {
    //        await this.popUp.waitFor({ state: 'visible' });
    //    });
   // }
}