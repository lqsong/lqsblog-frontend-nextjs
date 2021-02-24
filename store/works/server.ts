import request from "../../utils/request";

export const getWorksListApi = (per: number = 10, page: number = 1): Promise<Response> =>{
   return request(`/works/list?per=${per}&page=${page}`);
}

export const getWorksDetailApi = (id: number): Promise<Response> =>{
   return request(`/works/detail?id=${id}`);
}