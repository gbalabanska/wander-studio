export interface LoginResponseDTO {
  user: User;
  issuedAt: number;
  expiresAt: number;
}

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

export interface TripDto {
  name: string;
  dateFrom: string; // ISO date
  dateTo: string;
  tripEmoji: string;
  description: string;
  friendIds: number[]; // e.g., [2, 5, 8]
  places: {
    address: string;
    latitude?: number;
    longitude?: number;
  }[];
}
