import request from "../../utils/request";

export const getIndexRecommendApi = (): Promise<Response> =>{
   return request('/index/recommend');
}

export const getIndexListApi = (per: number = 10, page: number = 1, noSid: string = ''): Promise<Response> =>{
   return request(`/index/list?per=${per}&page=${page}&noSid=${noSid}`);
}