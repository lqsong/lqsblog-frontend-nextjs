export interface GlobalConfigResponse {
    siteCreationTime: string;
    copyrightPerson: string;
    copyrightUrl: string;
    icp: string;
    keywords: string;
    description: string;
}

export interface GlobalConfigState {
    loading: boolean,
    config: GlobalConfigResponse;
}