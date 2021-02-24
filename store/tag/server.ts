import request from "../../utils/request";

export const getTagContentListApi = (per: number = 10, page: number = 1, tagname: string): Promise<Response> =>{
   return request(`/tag/list?per=${per}&page=${page}&name=${tagname}`);
}

export const getTagDetailApi = (name: string): Promise<Response> =>{
   return request(`/tag/detail?name=${name}`);
}

