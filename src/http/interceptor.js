import axios from "axios";
import { getAPIKey, getHeaders } from "../utils";

export function initInterceptors() {
    requestInterceptor();
    responseInterceptor();
}
// helpful doc: https://lightrains.com/blogs/axios-intercepetors-react/
function requestInterceptor() {
    axios.interceptors.request.use(request => {
        if(!request.headers.has('X-RapidAPI-Host')) {
            const headers = getHeaders(request.method);
            request.headers = headers;
        }
        // throw new Error('error');
        return request;
    });
}

function responseInterceptor() {
    axios.interceptors.response.use(
        response => response,
        error => {
            console.log(error);
            const prevReq = error.config;
            if(error.code === "ERR_BAD_REQUEST" && !prevReq.retry) {
                prevReq.retry = true;
                const prevHeaders = prevReq.headers;
                const API_KEY = getAPIKey();
                prevHeaders['X-RapidAPI-Key'] = API_KEY;
                
                return axios(prevReq);
            }
            return error;
        }
    )
}