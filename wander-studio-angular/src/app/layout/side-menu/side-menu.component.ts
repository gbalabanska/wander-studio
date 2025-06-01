import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../authentication/service/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SessionTimerComponent } from '../../authentication/session-timer/session-timer.component';
import { User } from '../../../models/dto/dtos';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [RouterModule, CommonModule, SessionTimerComponent],
  template: `
    <nav class="side-menu">
      <!-- App Name and Logo -->
      <div class="app-header lavander-bubble">
        <div class="logo" style="user-select: none">
          <img src="logo.jpg" alt="Logo" class="app-logo" />
        </div>
        <h1 class="app-name">Wander Studio</h1>
      </div>
      <hr
        style="border: 0; height: 5px; background: linear-gradient(to right, #ac3457, #1e274e); margin: 20px 0;"
      />

      <!-- User Profile -->
      <div class="user-profile" *ngIf="user$ | async as user">
        <img
          class="profile-img"
          [src]="user.gender === 'F' ? 'w.png' : 'm.png'"
          alt="User"
        />
        <div
          class="user-info"
          style="display: flex; flex-direction: column; overflow: hidden; max-width: 100%;"
        >
          <span
            class="user-name"
            style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"
            >{{ user.username }}</span
          >
          <span
            class="user-role"
            style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"
            >{{
              user.gender === 'F' ? 'Explorer Queen' : 'Adventure Enthusiast'
            }}</span
          >
          <span
            class="user-email"
            style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"
            >{{ user.email }}</span
          >
        </div>
      </div>

      <!-- Menu Items -->
      <div class="menu-items">
        <a routerLink="/layout/dashboard" routerLinkActive="active"
          >🏠 Dashboard</a
        >
        <a routerLink="/layout/new-trip" routerLinkActive="active"
          >🌍 New Trip</a
        >
        <a routerLink="/layout/friends" routerLinkActive="active">👥 Friends</a>
      </div>

      <div class="bottom-content">
        <app-session-timer style="margin-bottom: 40px;"></app-session-timer>
        <button class="logout-btn" (click)="logout()">Log Out 👋</button>
      </div>
    </nav>
  `,
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  user$!: Observable<User | null>;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user$ = this.authService.user$;
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Logout failed:', error);
      },
    });
  }
}
