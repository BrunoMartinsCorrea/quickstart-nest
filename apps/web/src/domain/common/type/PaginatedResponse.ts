export interface PaginatedResponse<T> {
  results: T[];
  page: number;
  limit: number;
  totalCount: number;
}
