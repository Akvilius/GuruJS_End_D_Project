import { expect , test} from '@playwright/test';
import {App} from '../src/pages/findBags/app.page.js'

let  app;

test('@Bug Изменить количество отображаемых товаров на странице', async({ page }) => {

    app = new App(page);
    await app.mainPage.open();
    await app.findBagsPage.getThingsOnPage();
    
    await test.step('Появляется сообщение об ошибке', async() => {
        await expect(app.findBagsPage.mistakeMessage).toBeVisible();
    });
});

test('@Bug Изменить отображение цен товаров в евро', async({ page }) => {
    app = new App(page);
    await app.mainPage.open();
    await app.findBagsPage.goToProduct();
    await app.productPage.changeCurrencyEur();
 
    await test.step('Появляется сообщение об ошибке', async() => {
        await expect(app.findBagsPage.mistakeMessage.nth(1)).toBeVisible();

    });
});

test('@Bug Перейти на детальную страницу товара в категории "hot item"', async({ page }) => {
    app = new App(page);
    await app.mainPage.open();
    await app.findBagsPage.goToProduct();
    await app.productPage.goToHotItem();
    
    await test.step('Появляется поп-ап для выбора типа и описания бага', async() => {
        await expect(app.popUp).toContainText('What did you find out?');
    });
});

test('@Bug Перейти на страницу производителя товара', async({ page }) => {
    app = new App(page);
    await app.mainPage.open();
    await app.findBagsPage.goToProduct();
    await app.productPage.goToManufacturer();
   
    await test.step('Появляется поп-ап для выбора типа и описания бага', async() => {
        await expect(app.popUp).toContainText('What did you find out?');
    });
    
});

test('@Bug Отфильтровать товары по ценовому диапазону "$15.00 - $19.99"', async({ page }) => {
    app = new App(page);
    await app.mainPage.open();
    await app.findBagsPage.goToProduct();
    await app.productPage.filterPriceRange();
 
    await test.step('Появляется поп-ап для выбора типа и описания бага', async() => {
        await expect(app.popUp).toContainText('What did you find out?');
    });
});
