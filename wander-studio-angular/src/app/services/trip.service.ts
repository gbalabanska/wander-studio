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
  private readonly tripsUrl = environment.apiUrl + '/api/trips';

  constructor(private http: HttpClient) {}

  // Get trip by ID
  getTripById(tripId: number): Observable<ApiResponse<TripDto>> {
    const url = `${this.tripsUrl}/${tripId}`;
    return this.http.get<ApiResponse<TripDto>>(url, { withCredentials: true });
  }
}
