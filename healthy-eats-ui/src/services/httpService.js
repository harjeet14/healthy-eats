
import config from '../config';

const apiServiceUrl = config?.apiServiceUrl ?? "http://locahost/";
const apiServicePort = config?.apiServicePort ?? 8080;

class _HttpService {

    async fetchData(path, method, bodyData, searchParams = {}, headers = {}) {

        method = method.toUpperCase();

        let url;
        if (path.startsWith('/')) {
            url = new URL(apiServiceUrl);
            url.port = apiServicePort;
            url.pathname = path;
        } else {
            url = new URL(path);
        }


        for (let param in searchParams) {
            url.searchParams.set(param, searchParams[param]);
        }

        let config = {
            method,
            headers: { ...{ "Content-Type": "application/json" }, ...headers }
        }

        if (bodyData && (method === 'POST' || method === 'PUT')) {
            config.body = JSON.stringify(bodyData);
        }

        let response = await fetch(url.toString(), config);

        if (response.ok && response.status === 200) {

            let data = await response.json();
            return data;
        }

        throw new Error('Something went wrong on api server!');

    }

    get(path, searchParams) {
        return this.fetchData(path, "GET", null, searchParams, null);
    }

    delete(path) {
        return this.fetchData(path, "DELETE", null, null, null);
    }

    post(path, bodyData) {
        return this.fetchData(path, "POST", bodyData, null, null);
    }

    put(path, bodyData) {
        return this.fetchData(path, "PUT", bodyData, null, null);
    }
}

const HttpService = new _HttpService();
export default HttpService;