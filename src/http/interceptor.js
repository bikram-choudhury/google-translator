import axios from "axios";
import { getAPIKey, getHeaders } from "../utils";

export function initInterceptors() {
    requestInterceptor();
    responseInterceptor();
}

function requestInterceptor() {
    axios.interceptors.request.use(request => {
        const headers = getHeaders(request.method);
        const API_KEY = getAPIKey();
        // headers['X-RapidAPI-Key'] = API_KEY;
        request.headers = headers;
        // throw new Error('error');
        return request;
    });
}

function responseInterceptor() {
    axios.interceptors.response.use(
        response => response,
        error => {
            const customErr = {
                statusCode: error.response.status,
                code: error.code,
                message: error.message
            }
            return Promise.reject(customErr);
            /* // If client does handle only success response
            return Promise.resolve({
                data: {
                    data: {
                        languages: []
                    }
                }
            }) */
        }
    )
}