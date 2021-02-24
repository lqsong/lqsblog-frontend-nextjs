import { SearchListItem } from "../search/types";


export interface TagContentListResponse {
    list: SearchListItem[];
    total: number;
    currentPage: number;
}
