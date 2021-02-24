import request from "../../utils/request";

export const getConfigApi = (): Promise<Response> =>{
   return request('/config');
}