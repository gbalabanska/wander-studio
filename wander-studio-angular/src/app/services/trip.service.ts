import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment'; // Path to your environment file
import { ApiResponse } from '../../models/reponse/api-response.model'; // Path to ApiResponse model
import { TripDto } from '../../models/dto/dtos';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  private readonly baseUrl = environment.apiUrl + '/api/trips';

  constructor(private http: HttpClient) {}

  getAllTrips(): Observable<ApiResponse<TripDto[]>> {
    return this.http.get<ApiResponse<TripDto[]>>(this.baseUrl, {
      withCredentials: true,
    });
  }
  // Get trip by ID
  getTripById(tripId: number): Observable<ApiResponse<TripDto>> {
    const url = `${this.baseUrl}/${tripId}`;
    return this.http.get<ApiResponse<TripDto>>(url, { withCredentials: true });
  }

  createTrip(newTrip: TripDto): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(this.baseUrl, newTrip, {
      withCredentials: true,
    });
  }

  updateTrip(newTrip: TripDto, tripId: number): Observable<ApiResponse<void>> {
    const url = `${this.baseUrl}/${tripId}`;
    return this.http.put<ApiResponse<void>>(url, newTrip, {
      withCredentials: true,
    });
  }

  deleteTrip(tripId: number): Observable<ApiResponse<void>> {
    const url = `${this.baseUrl}/${tripId}`;
    return this.http.delete<ApiResponse<void>>(url, { withCredentials: true });
  }
}
