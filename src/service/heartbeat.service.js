const URL = `${process.env.API_URL}heartbeat`;

export class HeartbeatService {
    constructor (request)
    {
        this.request = request;
    }

    async deleteHeartbeat(token) {
        const response = await this.request.delete(URL,{
            headers: token,
        });
        return response;
    }

    async patchHeartbeat(token) {
        const response = await this.request.patch(URL,{
            headers: token,
        });
        return response;
    }

    async traceHeartbeat(token) {
        const response = await this.request.fetch(URL,{ 
            method: 'TRACE',
            headers: token,
        });
        return response;
    }

    async getHeartbeat(token) {
        const response = await this.request.get(URL,{
            headers: token,
        });
        return response;
    }

    async postHeartbeat(token) {
        const response = await this.request.post(URL,{ 
            headers: token,
        });
        return response;
    }

}
