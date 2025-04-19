import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [RouterModule],
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
          <span class="user-name">Gabby</span>
          <span class="user-role">Adventure Enthusiast</span>
        </div>
      </div>

      <!-- Menu Items -->
      <div class="menu-items">
        <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
        <a routerLink="/new-trip" routerLinkActive="active">New Trip</a>
        <a routerLink="/friends" routerLinkActive="active">Friends</a>
      </div>

      <!-- Log Out Button -->
      <div class="bottom-content">
        <button class="logout-btn">Log Out 👋</button>
      </div>
    </nav>
  `,
  styles: [
    `
      :root {
        --orange-pink: #e77278;
        --orange-red: #ac3457;
        --dark-purpl: #1e274e;
        --brownish-yellow: #edbd8c;
      }

      .lavander-bubble {
        background-color: #e6dbdb;
        padding-top: 5px;
        border-radius: 25px;
        border: 3px solid #ac3457;
      }
      .side-menu {
        width: 220px;
        background: white;
        color: black;
        padding: 20px;
        display: flex;
        flex-direction: column;
        position: fixed;
        top: 0;
        left: 0;
        height: 95%; /*For browser navigation menu bug fix*/
        overflow-y: auto;
        box-shadow: 4px 0 10px rgba(231, 114, 120, 0.4);
      }

      .app-header {
        text-align: center;
        margin-bottom: 20px;
      }

      .logo img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        object-fit: cover;
        transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
      }

      .logo img:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 12px var(--orange-pink);
      }

      .app-name {
        font-size: 24px;
        font-weight: bold;
        margin-top: 10px;
        background: linear-gradient(
          45deg,
          var(--orange-pink),
          var(--orange-red),
          var(--dark-purpl),
          var(--brownish-yellow)
        );
        -webkit-background-clip: text;
        color: transparent;
        animation: gradient-animation 5s ease infinite;
      }

      @keyframes gradient-animation {
        0% {
          background-position: 0%;
        }
        100% {
          background-position: 100%;
        }
      }

      .user-profile {
        display: flex;
        align-items: center;
        margin: 20px 0;
      }

      .profile-img {
        width: 55px;
        height: 55px;
        border-radius: 50%;
        margin-right: 15px;
        transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
        border: 3px solid #ac3457;
      }

      .profile-img:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 12px var(--orange-pink);
      }

      .user-info {
        display: flex;
        flex-direction: column;
      }

      .user-name {
        font-size: 16px;
        font-weight: bold;
        color: var(--orange-red);
      }

      .user-role {
        font-size: 14px;
        color: #666;
      }

      .menu-items a {
        color: #333;
        text-decoration: none;
        padding: 14px 20px;
        display: block;
        margin: 10px 0;
        border-radius: 25px;
        background: rgb(230, 219, 219);
        transition: all 0.3s ease-in-out;
        box-shadow: 2px 3px 8px rgba(0, 0, 0, 0.1);
        position: relative;
      }

      .menu-items a:hover {
        background: var(--orange-pink);
        color: white;
        box-shadow: 0 6px 15px var(--dark-purpl);
        transform: scale(1.05);
      }

      .active {
        font-weight: bold;
        border: 3px solid var(--orange-red);
        padding-left: 10px;
        background: var(--brownish-yellow);
        color: white;
        box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
      }

      .bottom-content {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        justify-content: flex-end;
      }

      .logout-btn {
        background: linear-gradient(
          to right,
          var(--orange-red),
          #e5533e
        ); /* Gradient from orange-red to a lighter red */
        color: white;
        border: none;
        padding: 14px 20px;
        border-radius: 25px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 2px 3px 8px rgba(0, 0, 0, 0.1);
      }

      .logout-btn:hover {
        background: linear-gradient(
          to right,
          #e5533e,
          var(--orange-red)
        ); /* Invert the gradient on hover */
        transform: scale(1.1);
        box-shadow: 0 6px 15px rgba(255, 99, 71, 0.4);
      }
    `,
  ],
})
export class SideMenuComponent {}
