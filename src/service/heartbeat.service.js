const URL = 'https://apichallenges.herokuapp.com/';

export class HeartbeatService {
    constructor (request)
    {
        this.request = request;
    }

    async deleteHeartbeat(token) {
        const response = await this.request.delete(`${URL}heartbeat`,{
            headers: token,
        });
        return response;
    }

    async patchHeartbeat(token) {
        const response = await this.request.patch(`${URL}heartbeat`,{
            headers: token,
        });
        return response;
    }

    async traceHeartbeat(token) {
        const response = await this.request.fetch(`${URL}heartbeat`,{ 
            method: 'TRACE',
            headers: token,
        });
        return response;
    }

    async getHeartbeat(token) {
        const response = await this.request.get(`${URL}heartbeat`,{
            headers: token,
        });
        return response;
    }

    async postHeartbeat(token) {
        const response = await this.request.post(`${URL}heartbeat`,{ 
            headers: token,
        });
        return response;
    }

}
