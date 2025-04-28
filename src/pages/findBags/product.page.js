import { test } from '@playwright/test';

export class ProductPage {
    constructor(page){
        this.page = page;

        this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
        this.commentButton = page.getByRole('button', { name: 'Post Comment'});

        this.currencyDropdown = page.locator('#ec_currency_conversion');

        this.hotItemLink = page.locator('#ec_image_product_widget_anchor-bracelet_1_0');
      
        this.signUpLink = page.getByRole('link', { name : 'Sign Up'})
        this.manufacturerLink = page.getByRole('link', { name : 'DNK'});
        this.priceFilterLink = page.getByRole('link', { name: '$15.00 - $19.99 (1)'});
        
        this.nameFiled = page.getByRole('textbox', { name: 'Name' });
        this.emailField = page.getByRole('textbox', { name: 'Email' });
        
        this.hotItemLoader = page.locator('#post-1820 span');

        //await page.locator('#ec_currency_conversion').selectOption('EUR');
        //await page.getByRole('heading', { name: 'You found a crash bug,' }).nth(1).click();
    };
    
    async postComment(name, email){
        await test.step('Опубликовать комментарий к товару только с обязательными полями', async() => {
            await this.nameFiled.click();
            await this.nameFiled.fill(name);
            await this.emailField.click();
            await this.emailField.fill(email);
            await this.commentButton.click();
        });

    }


    async changeCurrencyEur(){
        await test.step('Изменить отображение цен на сайте в евро', async() => {
            await this.currencyDropdown.click();
            await this.page.waitForLoadState();
            await this.currencyDropdown.selectOption('EUR');
            await this.currencyDropdown.dispatchEvent('change');
        });
    }

    async goToSignUpPage(){
        await test.step('Перейти в раздел регистрации/авторизации', async() => {
            await this.signUpLink.click();
        });
    }

    async goToHotItem(){
        await test.step('Перейти на детальную страницу товара категории "hot item"', async() => {
            await this.hotItemLink.click();
            await this.hotItemLoader.click({ force: true });
        });
    }

    async filterPriceRange(){
        await test.step('Выбрать ценовой диапазон "$15.00 - $19.99" в панели фильтров', async() => {
            await this.priceFilterLink.click();
        });
    }

    async goToManufacturer(){
        await test.step('Перейти на страницу производителя товара', async() => {
            await this.manufacturerLink.click();
            await this.page.goBack();
        });
    }
    
    async addToCart(){
        await test.step('Добавить товар в корзину и перейти в корзину', async() => {
            await this.addToCartButton.click();
        });
    }
}