export interface User {
  id: number;
  username: string;
  email: string;
  gender: string;
}

export interface Friend {
  id: number;
  username: string;
  email: string;
  gender: string;
}

export interface PagedResponse<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
}
