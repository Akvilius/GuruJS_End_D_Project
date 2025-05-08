const URL = `${process.env.API_URL}challenges`

export class ChallengesService {
    constructor (request)
    {
        this.request = request;
    }

    async get(token) {
        const response = await this.request.get(URL,{
            headers: token
        });
        return response;
    }


}
