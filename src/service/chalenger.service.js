const URL = 'https://apichallenges.herokuapp.com/';

export class ChallengerService {
    constructor (request)
    {
        this.request = request;
    }

    async post () {
        const response = await this.request.post(`${URL}challenger`);
        return response;
    }

    async getChallengerGuid(header, guid) {
        const response = await this.request.get(`${URL}challenger/${guid}`,{
            headers: header,
        });
        return response;
    }

    async putChallengerGuid(header, body, guid) {
        const response = await this.request.put(`${URL}challenger/${guid}`,{
            headers: header,
            data: body
        });
        return response;
    }

    async getDatabaseGuid(header, guid) {
        const response = await this.request.get(`${URL}challenger/database/${guid}`,{
            headers: header,
        });
        return response;
    }

    async putDatabaseGuid(header, body, guid) {
        const response = await this.request.put(`${URL}challenger/database/${guid}`,{
            headers: header,
            data: body
        });
        return response;
    }

}
