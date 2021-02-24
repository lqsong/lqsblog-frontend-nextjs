interface CategoryItem {
    id: number;
    name: string;
    alias: string;
    title?: string;
    keywords?: string;
    description?: string;
}

export interface ArticleDetail {
    id?: number
    title: string;
    keywords: string;
    description: string;
    addtime: string;
    hit: string;
    category: CategoryItem;
    tag: string[];
    content: string;
    interestIds: string;
}

export interface ArticleListItem {
    id: number
    title: string;
    description: string;
    thumb: string[];
    category: CategoryItem;
    addtime: string;
}

export type ArticleDetailResponse = ArticleDetail;

export type ArticleCategoryResponse = CategoryItem;

export type ArticleInterestResponse = ArticleListItem[];

export interface ArticleListResponse {
    list: ArticleListItem[];
    total: number;
    currentPage: number;
}
