import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/reponse/api-response.model'; // Path to your ApiResponse model
import { environment } from '../environment/environment';
import { Friend, PagedResponse, User } from '../../models/dto/dtos';

@Injectable({
  providedIn: 'root',
})
export class FriendService {
  private readonly friendsUrl = environment.apiUrl + '/api/friends';
  private readonly addFriendToChannelUrl =
    environment.apiUrl + '/api/channels/addFriends';

  constructor(private http: HttpClient) {}

  //----------------------------ADD FRIEND TO CHANNEL
  // Get friend list for a specific user
  getFriendList(page: number = 0, size: number = 5) {
    const url = `${this.friendsUrl}?page=${page}&size=${size}`;
    return this.http.get<ApiResponse<PagedResponse<Friend>>>(url, {
      withCredentials: true,
    });
  }

  addFriendToChannel(channelId: number, friendId: number): Observable<any> {
    const url = `${this.addFriendToChannelUrl}/${channelId}`; // Use the channelId in the URL
    const body = { friendId: friendId }; // Request body
    return this.http.post<any>(url, body, {
      withCredentials: true,
    });
  }

  //----------------------------ADD FRIEND TO FRIENDLIST
  private readonly apiUrl = environment.apiUrl;

  // Load all users
  loadAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/api/users`, {
      withCredentials: true,
    });
  }

  // Search users by query
  searchUsers(username: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/api/users/${username}`, {
      withCredentials: true,
    });
  }

  // Add user to friend list
  addToFriendList(userId: number): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/api/users/addFriend/${userId}`,
      {},
      {
        withCredentials: true,
      }
    );
  }

  deleteFriend(
    friendId: number
  ): Observable<{ data: string | null; message: string }> {
    return this.http.delete<{ data: string | null; message: string }>(
      `${this.apiUrl}/api/friends/${friendId}`,
      { withCredentials: true }
    );
  }
}
