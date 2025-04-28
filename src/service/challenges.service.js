const URL = 'https://apichallenges.herokuapp.com/';

export class ChallengesService {
    constructor (request)
    {
        this.request = request;
    }

    async get(token) {
        const response = await this.request.get(`${URL}challenges`,{
            headers: token
        });
        return response;
    }


}
