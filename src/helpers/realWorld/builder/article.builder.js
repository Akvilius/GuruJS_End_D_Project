import { faker } from '@faker-js/faker';

export class ArticleBuilder {
    addTitle(){
        this.articleTitle = `Akva ${faker.lorem.sentence(2)} `;
        return this;
    }
    addAbout(symbol=5){
        this.articleAbout = faker.lorem.sentence(symbol);
        return this;
    }
    addBody(symbol=5){
        this.articleBody = faker.lorem.paragraph(symbol);
        return this;
    }
    addTag(tag='My_test'){
        this.articleTag = tag;
        return this;
    }

    genereteArticle(){
        return{
            articleTitle: this.articleTitle,
            articleAbout: this.articleAbout,
            articleBody: this.articleBody,
            articleTag: this.articleTag
        };
    }
}
