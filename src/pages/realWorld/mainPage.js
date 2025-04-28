export class MainPage {
    constructor (page)
    {
        this.page = page;
        this.singupButton = page.getByRole('link', { name: 'Sign up' });
        this.loginButton = page.getByRole('link', { name: 'Login' });
        this.newArticleButton = page.getByRole('link', { name: 'New Article' });
    }

    async goToReg () {

        await this.singupButton.click();
    }
    async goToLogin () {

        await this.loginButton.click();
    }
    async goToPublishNewArticle () {

        await this.newArticleButton.click();
    }

    async open (url) {
        await this.page.goto(url);
    }


}