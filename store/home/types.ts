import { SearchItem, SearchListItem } from "../search/types";


export interface IndexListResponse {
    list: SearchListItem[];
    total: number;
    currentPage: number;
}

export type IndexRecommendResponse = SearchItem[];
