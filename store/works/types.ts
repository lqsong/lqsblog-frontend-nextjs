
export interface WorksDetail {
    id?: number
    title: string;
    keywords: string;
    description: string;
    addtime: string;
    hit: string;
    tag: string[];
    content: string;
}

export interface WorksListItem {
    id: number
    title: string;
    description: string;
    thumb: string[];
    addtime: string;
}

export type WorksDetailResponse = WorksDetail;


export interface WorksListResponse {
    list: WorksListItem[];
    total: number;
    currentPage: number;
}
