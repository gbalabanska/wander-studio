import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiUrl + '/auth';
  private usernameSubject: BehaviorSubject<string | null>;
  username$: Observable<string | null>;

  constructor(private http: HttpClient) {
    const storedUsername = sessionStorage.getItem('username');
    this.usernameSubject = new BehaviorSubject<string | null>(storedUsername);
    this.username$ = this.usernameSubject.asObservable();
    console.log('AuthService initialized');
  }

  setUsername(username: string | null): void {
    if (username) {
      sessionStorage.setItem('username', username);
    } else {
      sessionStorage.removeItem('username');
    }
    this.usernameSubject.next(username);
  }

  signup(user: {
    username: string;
    password: string;
    email: string;
    roles: string;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/addNewUser`, user, {
      withCredentials: true,
    });
  }

  login(username: string, password: string): Observable<any> {
    return this.http
      .post(
        `${this.baseUrl}/generateToken`,
        { username, password },
        { withCredentials: true }
      )
      .pipe(
        tap(() => {
          console.log(`User ${username} logged in successfully.`);
          this.setUsername(username); // <== use setUsername() instead
        })
      );
  }

  logout(): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/logout`, {}, { withCredentials: true })
      .pipe(
        tap(() => {
          this.setUsername(null); // <== clear username properly
          sessionStorage.clear();
          console.log('User logged out successfully.');
        })
      );
  }
}
