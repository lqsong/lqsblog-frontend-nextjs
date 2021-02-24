import { SearchListItem, SearchListItemThumbStr } from "../search/types";


export interface TopicsDetail {
    id: number;
    title: string;
    keywords: string;
    description: string;
    addtime: string;
    hit: number;
    list: SearchListItem[];
}

export type TopicsDetailThumbStr = Omit<TopicsDetail, 'list'> & {
    list: SearchListItemThumbStr[];
}

export interface TopicsListItem {
    id: number;
    alias: string;
    quantity: number;
    title: string;
    conlist: SearchListItemThumbStr[];
}

export type TopicsDetailResponse = TopicsDetail;

export interface TopicsListResponse {
    list: TopicsListItem[];
    total: number;
    currentPage: number;
}