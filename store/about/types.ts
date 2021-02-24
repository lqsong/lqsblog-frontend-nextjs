export interface AboutResponse {
    title: string;
    keywords: string;
    description: string;
    content: string;
}

export interface AboutState {
    loading: boolean,
    about: AboutResponse;
}