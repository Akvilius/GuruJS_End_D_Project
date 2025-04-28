import { faker } from '@faker-js/faker';

export class TodosBuilder {
    addTitle(length = -1){
        if (length == -1) 
        this.title = 'create todo process payroll';
        else
        this.title =faker.string.alpha(length);
        return this;
    }
    addDoneStatus(status = true){
        this.doneStatus =  status;
        return this;
    }
    addDescription(length = -1){
        if (length == -1)
        this.description = '';
        else
        this.description =faker.string.alpha(length);
        return this;
    }

    genereteTodos(){
        const todos = {
            title: this.title,
            doneStatus: this.doneStatus,
            description: this.description
        };
        // Удаляем пустые поля
        for (const key in todos) {
            if (todos[key] === null || todos[key] === undefined) {
                delete todos[key];
            }
        }
        return todos;
    }
}
