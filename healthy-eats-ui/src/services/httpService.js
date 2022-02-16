import { appConfig } from "../appConfig.example";

const apiServiceUrl = appConfig?.apiService?.url ?? "http://localhost/";
const apiServicePort = appConfig?.apiService?.port ?? 8080;

class _HttpService {
  async fetchData(path, method, bodyData, searchParams = {}, headers = {}) {
    searchParams = searchParams || {};
    headers = headers || {};

    method = method.toUpperCase();

    let url;
    if (path.startsWith("/")) {
      url = new URL(apiServiceUrl);
      url.port = apiServicePort;
      url.pathname = path;

      headers["Content-Type"] = "application/json";
    } else {
      url = new URL(path);
    }

    for (let param in searchParams) {
      url.searchParams.set(param, searchParams[param]);
    }

    let config = {
      method,
      mode: "cors",
      headers: headers,
    };

    if (bodyData && (method === "POST" || method === "PUT")) {
      config.body = JSON.stringify(bodyData);
    }

    let response = await fetch(url.toString(), config);

    if (response.ok) {
      if (response.status === 200 || response.status === 201) {
        let data = await response.json();
        return data;
      } else if (response.status === 204) {
        return null;
      }

      throw new Error(
        `${response.status} - ${url} - Something went wrong on api server!`
      );
    }
  }

  get(path, searchParams) {
    return this.fetchData(path, "GET", null, searchParams, null);
  }

  delete(path, searchParams) {
    return this.fetchData(path, "DELETE", null, searchParams, null);
  }

  post(path, bodyData, searchParams) {
    return this.fetchData(path, "POST", bodyData, searchParams, null);
  }

  put(path, bodyData) {
    return this.fetchData(path, "PUT", bodyData, null, null);
  }
}

const HttpService = new _HttpService();
export default HttpService;
