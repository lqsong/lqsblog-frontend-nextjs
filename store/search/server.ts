import request from "../../utils/request";


export const getSearchListApi = (per: number = 10, page: number = 1, keywords: string): Promise<Response> =>{
   return request(`/search?per=${per}&page=${page}&keywords=${keywords}`);
}
