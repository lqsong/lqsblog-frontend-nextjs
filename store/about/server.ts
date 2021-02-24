import request from "../../utils/request";

export const getAboutApi = (): Promise<Response> =>{
   return request('/about');
}