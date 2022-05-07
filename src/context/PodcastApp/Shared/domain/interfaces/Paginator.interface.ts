export interface Paginator<T> {
  from?: number;
  limit?: number;
  sort_by?: keyof T;
  order?: "asc" | "desc";
}
