/**
 * T: Type of the items in the paginator
 */
export interface Paginator<T> {
  page?: number;
  sort_by?: keyof T;
  order?: 'asc' | 'desc';
}
