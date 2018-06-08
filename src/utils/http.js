/**
 * Created by wenbo.kuang on 2018/6/8.
 */
import axios from 'axios';

const defaultConfig = {
    timeout: 3000,
};

let instance = axios;

class Axios {
    constructor(props) {
        if (props && typeof props === 'object') {
            instance = axios.create(props);
        } else {
            instance = axios.create(defaultConfig);
        }

        //拦截request
        instance.interceptors.request.use((config) => {
            return config;
        }, (error) => {
            console.log(error);
            return Promise.reject(error);
        });

        //响应结果
        instance.interceptors.response.use((response) => {
            return response;
        }, (error) => {
            console.log(error);
            return Promise.reject(error);
        });

    }

    async send(config) {
        try {
            return await instance.request(config);
        } catch (e) {
            throw new Error(e);
        }
    }

    getRequest(url, method = 'GET', param, config = {}) {
        return Object.assign(config, {
            method: method,
            withCredentials: true,
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Cache-Control': ' no-cache'
            },
            params: method.toUpperCase() === "POST" ? null : param,
            data: method.toUpperCase() === "GET" ? null : param,
            url: url
        });
    }
}

const Instance = new Axios();
export default Instance;