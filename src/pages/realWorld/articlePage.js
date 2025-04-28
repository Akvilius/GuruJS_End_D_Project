export class ArticlePage {
    constructor (page)
    {
        this.page = page;

        this.postComment = page.getByRole('button', { name: 'Post Comment' });

        this.paragraphField = page.locator("div[class='container'] h1");
        this.commentField = page.getByPlaceholder('Write a comment...');
        this.errorMassage = page.locator('.card-text').last();
    }

    async addComment (comment){
        await this.commentField.click();
        await this.commentField.fill(comment);
        await this.postComment.click();
    }

}
