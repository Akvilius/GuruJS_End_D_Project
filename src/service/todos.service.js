import { TodosBuilder } from "../helpers/api/todos.builder";

const URL = 'https://apichallenges.herokuapp.com/';

export class TodosService {
    constructor (request)
    {
        this.request = request;
    }

    async getTodos(token) {
        const response = await this.request.get(`${URL}todos`,{
            headers: token,
        });
        return response;
    }

    async getTodo(token) {
        const response = await this.request.get(`${URL}todo`,{
            headers: token,
        });
        return response;
    }

    async getTodosId(token, id) {
        const response = await this.request.get(`${URL}todos/${id}`,{
            headers: token,
        });
        return response;
    }

    async getTodosFilter(token) {
        const response = await this.request.get(`${URL}todos?doneStatus=true`,{
            headers: token,
        });
        return response;
    }

    async postTodos(token, body) {
        const response = await this.request.post(`${URL}todos`,{
            headers:token,
            data: body
        });
        return response;
    }

    async headTodos(token) {
        const response = await this.request.head(`${URL}todos`,{
            headers:token
        });
        return response;
    }

    async putTodos(token, body, id) {
        const response = await this.request.put(`${URL}todos/${id}`,{
            headers: token,
            data: body
        });
        return response;
    }

    async postTodosId(token, body, id) {
        const response = await this.request.post(`${URL}todos/${id}`,{
            headers:token,
            data: body
        });
        return response;
    }

    async deleteTodos(token, id) {
        const response = await this.request.delete(`${URL}todos/${id}`,{
            headers:token
        });
        return response;
    }
        
}
