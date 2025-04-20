import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../authentication/service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <nav class="side-menu">
      <!-- App Name and Logo -->
      <div class="app-header lavander-bubble">
        <div class="logo">
          <img src="mountain-purple-orange-2.JPG" alt="Logo" class="app-logo" />
        </div>
        <h1 class="app-name">Wander Studio</h1>
      </div>
      <hr
        style="border: 0; height: 5px; background: linear-gradient(to right, #ac3457, #1e274e); margin: 20px 0;"
      />

      <!-- User Profile -->
      <div class="user-profile ">
        <img class="profile-img" src="face.jpg" alt="User" />
        <div class="user-info">
          <span class="user-name">{{ username$ | async }}</span>
          <span class="user-role">Adventure Enthusiast</span>
        </div>
      </div>

      <!-- Menu Items -->
      <div class="menu-items">
        <a routerLink="/layout/dashboard" routerLinkActive="active"
          >Dashboard</a
        >
        <a routerLink="/layout/new-trip" routerLinkActive="active">New Trip</a>
        <a routerLink="/layout/friends" routerLinkActive="active">Friends</a>
      </div>

      <!-- Log Out Button -->
      <div class="bottom-content">
        <button class="logout-btn">Log Out 👋</button>
      </div>
    </nav>
  `,
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  username$: Observable<string | null>;

  constructor(private authService: AuthService) {
    this.username$ = this.authService.username$;
  }

  ngOnInit(): void {}
}
