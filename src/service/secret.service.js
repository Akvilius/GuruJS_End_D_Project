const URL = `${process.env.API_URL}secret`;

export class SecretService {
    constructor (request)
    {
        this.request = request;
    }

    async postSecret(token) {
        const response = await this.request.post(`${URL}/token`,{ 
            headers: token,
        });
        return response;
    }

    async getSecretNote(token) {
        const response = await this.request.get(`${URL}/note`,{ 
            headers: token,
        });
        return response;
    }

    async postSecretNote(token,body) {
        const response = await this.request.post(`${URL}/note`,{ 
            headers: token,
            data: body
        });
        return response;
    }


}
