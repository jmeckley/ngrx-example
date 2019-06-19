export interface ICharacter {
    id: number;
    name: string;
    imageUrl?: string;
}

export interface ISearchCriteria {
    pageIndex: number;
    pageSize: number;
}