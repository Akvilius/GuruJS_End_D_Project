
const API_URL = process.env.API_URL;

export class TodosService {
    constructor (request)
    {
        this.request = request;
    }

    async getTodos(token, filter=null) {
        if (filter == null)
        {
        const response = await this.request.get(`${API_URL}todos`,{
            headers: token,
        });
        return response;
        }
        else
        {
            const response = await this.request.get(`${API_URL}todos${filter}`,{
                headers: token,
            });
            return response;
        }
        //return response;
    }

    async getTodo(token) {
        const response = await this.request.get(`${API_URL}todo`,{
            headers: token,
        });
        return response;
    }

    async getTodosId(token, id) {
        const response = await this.request.get(`${API_URL}todos/${id}`,{
            headers: token,
        });
        return response;
    }

    async postTodos(token, body) {
        const response = await this.request.post(`${API_URL}todos`,{
            headers:token,
            data: body
        });
        return response;
    }

    async headTodos(token) {
        const response = await this.request.head(`${API_URL}todos`,{
            headers:token
        });
        return response;
    }

    async putTodos(token, body, id) {
        const response = await this.request.put(`${API_URL}todos/${id}`,{
            headers: token,
            data: body
        });
        return response;
    }

    async postTodosId(token, body, id) {
        const response = await this.request.post(`${API_URL}todos/${id}`,{
            headers:token,
            data: body
        });
        return response;
    }

    async deleteTodos(token, id) {
        const response = await this.request.delete(`${API_URL}todos/${id}`,{
            headers:token
        });
        return response;
    }
        
}
