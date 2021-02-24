
interface CategoryItem {
    id: number;
    name: string;
    alias: string
}

export interface SearchItem {
    id: number
    title: string;
    thumb: string;
    type: number;
    sid: number;
}

export interface SearchListItem {
    id: number
    title: string;
    description: string;
    thumb: string[];
    type: number;
    category?: CategoryItem;
    addtime: string;
}


export type SearchListItemThumbStr = Omit<SearchListItem, "thumb"> & {
    thumb: string;
}

export interface SearchListResponse {
    list: SearchListItem[];
    total: number;
    currentPage: number;
}