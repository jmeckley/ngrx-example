export interface IPagedResults<T> {
    pageIndex?: number;
    pageSize?: number;
    totalItems?: number;
    items: Array<T>;
    loading: boolean;
}