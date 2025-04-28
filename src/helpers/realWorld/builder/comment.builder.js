import { faker } from '@faker-js/faker';

export class CommentBuilder {
    addBody(symbol=5){
        this.commentBody = faker.lorem.sentence(symbol);
        return this;
    }

    genereteComment(){
        return{
            commentBody: this.commentBody
        };
    }
}
