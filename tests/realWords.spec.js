import { test, expect } from '@playwright/test';
import { UserBuilder, ArticleBuilder, CommentBuilder} from '../src/helpers/realWorld/builder/index';
import {App} from '../src/pages/realWorld/app.page';
require('dotenv').config();


let app;
const URL_UI = process.env.URL_UI;
test.describe ('Тесты для realworld', ()=>{

    test.beforeEach(async({page})=>{
        
        app = new App(page);
        const userBuilder = new UserBuilder()
            .addEmail()
            .addPassword()
            .addUsername()
            .genereteUser();

        await app.mainPage.open(URL_UI);
        await app.mainPage.goToReg();
        await app.regPage.reg(userBuilder.userName,userBuilder.userEmail,userBuilder.userPassword,);

    });

    test('Пользователь может опубликовать статью', async ({page})=>{ 
        app = new App(page);
        const article = new ArticleBuilder()
            .addTitle()
            .addAbout()
            .addBody()
            .addTag()
            .genereteArticle();

        await app.youfeedPage.goToNewArticle();
        await app.editorPage.publishNewArticle(article.articleTitle,article.articleAbout,article.articleBody,article.articleTag);
        await expect(app.articlePage.paragraphField).toContainText(article.articleTitle);
    });

    test('Пользователь может оставить комментарий к статье', async ({page})=>{ 
        app = new App(page);
        const article = new ArticleBuilder()
            .addTitle()
            .addAbout()
            .addBody()
            .addTag()
            .genereteArticle();
        const commentBuilder = new CommentBuilder()
            .addBody()
            .genereteComment();
        await app.youfeedPage.goToNewArticle();
        await app.editorPage.publishNewArticle(article.articleTitle,article.articleAbout,article.articleBody,article.articleTag); //Создаём статью

        await app.articlePage.addComment(commentBuilder.commentBody);
        await expect(app.articlePage.errorMassage).toContainText(commentBuilder.commentBody);//было падение из-за 2 комментариев к новости, поэтому смотрим на посследний
    });
   
    test('Пользователь может изменить пароль', async ({page})=>{ 
        app = new App(page);
        const password =  new UserBuilder().addPassword(10);
        await app.youfeedPage.goToSetting();
        const username = await page.getByPlaceholder('Your Name').inputValue(); // сохранием пользователя и почту для повторной авторизации
        const email = await page.getByPlaceholder('Email').inputValue();
        await app.settingPage.updatePassword(password.userPassword);

        await expect(app.settingPage.updateSettingButton).not.toBeVisible(); // Проверяем что изменения сохранились

        await app.youfeedPage.logout();
        await app.mainPage.goToLogin();
        await app.loginPage.login(email,password.userPassword);

        await expect(app.youfeedPage.profileNameField).toBeVisible();
        await expect(app.youfeedPage.profileNameField).toContainText(username);

    });
})
