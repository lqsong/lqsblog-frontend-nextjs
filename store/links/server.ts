import request from "../../utils/request";

export const getLinksListApi = (): Promise<Response> =>{
   return request('/links/list');
}

export const getLinksRecommendApi = (): Promise<Response> =>{
   return request('/links/recommend?ids=1');
}