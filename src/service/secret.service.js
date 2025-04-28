const URL = 'https://apichallenges.herokuapp.com/';

export class SecretService {
    constructor (request)
    {
        this.request = request;
    }

    async postSecret(token) {
        const response = await this.request.post(`${URL}secret/token`,{ 
            headers: token,
        });
        return response;
    }

    async getSecretNote(token) {
        const response = await this.request.get(`${URL}secret/note`,{ 
            headers: token,
        });
        return response;
    }

    async postSecretNote(token,body) {
        const response = await this.request.post(`${URL}secret/note`,{ 
            headers: token,
            data: body
        });
        return response;
    }


}
