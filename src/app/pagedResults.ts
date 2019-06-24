export interface IPagedResults<T> {
    pageIndex?: number;
    pageSize?: number;
    totalItems?: number;
    items: Array<T>;
    loading: boolean;
}

export interface ICurrent<T> {
    id: number;
    item: T;
    loaded: boolean;
}