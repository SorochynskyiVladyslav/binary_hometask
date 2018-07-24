import axios from 'axios';

const baseUrl = 'http://localhost:9000/';

class Api {
    constructor() {
        this.axios_instance = axios.create({
            baseURL: baseUrl
        })
    }

    sendRequest(url, type, dataToSend) {
        return this.axios_instance[type](url, dataToSend);
    }
}

export default new Api();