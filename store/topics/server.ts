import request from "../../utils/request";

export const getTopicsListApi = (per: number = 10, page: number = 1): Promise<Response> =>{
   return request(`/topics/list?per=${per}&page=${page}`);
}

export const getTopicsDetailApi = (alias: string): Promise<Response> =>{
   return request(`/topics/detail?alias=${alias}`);
}
