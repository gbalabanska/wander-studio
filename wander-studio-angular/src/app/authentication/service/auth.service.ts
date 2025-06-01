import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environment/environment';
import { TokenTimerService } from './token-timer.service';
import { LoginResponseDTO, User } from '../../../models/dto/dtos';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiUrl + '/auth';

  private userSubject: BehaviorSubject<User | null>;
  user$: Observable<User | null>;

  constructor(private http: HttpClient, private tokenTimer: TokenTimerService) {
    const storedUser = sessionStorage.getItem('user');
    this.userSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.user$ = this.userSubject.asObservable();

    console.log('AuthService initialized');
  }

  private setUser(user: User | null): void {
    if (user) {
      sessionStorage.setItem('user', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('user');
    }
    this.userSubject.next(user);
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
      .post<{ data: LoginResponseDTO; message: string }>(
        `${this.baseUrl}/generateToken`,
        { username, password },
        { withCredentials: true }
      )
      .pipe(
        tap((res) => {
          const user = res.data.user;
          const expiresAt = res.data.expiresAt;

          this.setUser(user);

          if (expiresAt) {
            sessionStorage.setItem('expiresAt', expiresAt.toString());
            this.tokenTimer.startCountdown(expiresAt);
          }
        })
      );
  }

  refreshToken(): Observable<any> {
    const user = this.userSubject.getValue();
    if (!user?.username) {
      throw new Error('User is not set');
    }

    return this.http.post(
      `${this.baseUrl}/refreshToken/${encodeURIComponent(user.username)}`,
      {},
      { withCredentials: true }
    );
  }

  logout(): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/logout`, {}, { withCredentials: true })
      .pipe(
        tap(() => {
          this.setUser(null);
          sessionStorage.clear();
          console.log('User logged out successfully.');
        })
      );
  }
}
