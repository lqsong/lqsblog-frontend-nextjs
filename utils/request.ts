/**
 * 自定义 request 网络请求工具,基于fetch
 * @author LiQingSong
 */
import fetch from 'isomorphic-unfetch';

export interface ResponseData {
    code: number;
    data?: any;
    msg?: string;
}

export default function request(url: string, options?: RequestInit): Promise<Response> {
    let opt = options || {};
    const fetchUrl = encodeURI(process.env.APP_API_HOST + url);
    return fetch(fetchUrl, {
        credentials: 'include', 
        ...opt
    }).then((response: Response) => {
        if (response.status >= 400) {
            return Promise.reject({code: response.status, msg: 'Bad response from server'});
        }        
        return response.json();
    }).then((res: ResponseData) => {
        const { code, data } = res;
        if (code !== 0) {
            return Promise.reject(res);
        }
        return data;
    })
    .catch((err) => Promise.reject(err));
}
   
