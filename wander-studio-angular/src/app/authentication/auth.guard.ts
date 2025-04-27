import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from './service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.username$.pipe(
      map((username) => {
        if (username) {
          // User is authenticated
          return true;
        } else {
          // No username -> Redirect to login
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
