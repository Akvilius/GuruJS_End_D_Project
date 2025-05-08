const URL = `${process.env.API_URL}challenger`

export class ChallengerService {
    constructor (request)
    {
        this.request = request;
    }

    async post () {
        const response = await this.request.post(URL);
        return response;
    }

    async getChallengerGuid(header, guid) {
        const response = await this.request.get(`${URL}/${guid}`,{
            headers: header,
        });
        return response;
    }

    async putChallengerGuid(header, body, guid) {
        const response = await this.request.put(`${URL}//${guid}`,{
            headers: header,
            data: body
        });
        return response;
    }

    async getDatabaseGuid(header, guid) {
        const response = await this.request.get(`${URL}/database/${guid}`,{
            headers: header,
        });
        return response;
    }

    async putDatabaseGuid(header, body, guid) {
        const response = await this.request.put(`${URL}/database/${guid}`,{
            headers: header,
            data: body
        });
        return response;
    }

}
