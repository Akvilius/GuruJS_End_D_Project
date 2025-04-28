import { faker } from '@faker-js/faker';

export class UserBuilder {
    addEmail(){
        this.userEmail = faker.internet.email();
        return this;
    }
    addPassword(symbol=10){
        this.userPassword = faker.internet.password({length: symbol});
        return this;
    }
    addUsername(){
        this.userName = faker.person.firstName();
        return this;
    }

    genereteUser(){
        return{
            userName: this.userName,
            userEmail: this.userEmail,
            userPassword: this.userPassword
        };
    }
}
