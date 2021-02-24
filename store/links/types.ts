export interface LinksItem {
    title: string;
    description: string;
    href: string;
    logo: string;
}

export interface LinksCategoryListItem {
    name: string;
    children: LinksItem[];
}

export type  LinksListResponse = LinksCategoryListItem[];

export type LinksRecommendResponse = LinksItem[];

export interface LinksState {
    listLoading: boolean;
    listData: LinksListResponse;
    recommendLoading: boolean;
    recommendData: LinksRecommendResponse;
}