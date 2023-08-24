export interface PaginatedResponseDto<T> {
  results: T[];
  page: number;
  limit: number;
  totalCount: number;
}
