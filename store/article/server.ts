import request from "../../utils/request";

export const getArticleCategoryApi = (alias: string): Promise<Response> =>{
   return request(`/article/category?alias=${alias}`);
}

export const getArticleListApi = (per: number = 10, page: number = 1, categoryId?: number | ''): Promise<Response> =>{
   return request(`/article/list?per=${per}&page=${page}&categoryId=${categoryId}`);
}

export const getArticleDetailApi = (id: number): Promise<Response> =>{
   return request(`/article/detail?id=${id}`);
}

export const getArticleInterestApi = (ids: string): Promise<Response> =>{
   return request(`/article/interest?ids=${ids}`);
}