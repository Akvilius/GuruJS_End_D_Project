export class GlobalFeedPage {
    constructor (page)
    {
        this.page = page;
        this.globalFeedButton = page.getByRole('button', { name: 'Global Feed' });
        this.articleLink = page.getByRole('link').filter({ hasText: 'Akva ' }).first();
        

    }

    async goToAricle () {
        await this.globalFeedButton.click();
        await this.articleLink.click();
    }
}