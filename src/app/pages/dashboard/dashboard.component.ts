import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TripViewComponent } from '../trip-view/trip-view.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, TripViewComponent],
  animations: [
    trigger('slideInFromTop', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate(
          '0.8s cubic-bezier(0.25, 0.8, 0.25, 1)',
          style({ transform: 'translateY(0)', opacity: 1 })
        ),
      ]),
    ]),
  ],
  template: `
    <header class="trip-header">
      <h1>
        <span class="emoji">📋</span>
        <span class="gradient-text">Dashboard</span>
      </h1>
      <p class="subtitle">
        Let’s get you closer to your next great escape. Start planning and make
        memories that last a lifetime. 🌟
      </p>
    </header>
    <hr
      style="
        border: 0;
        height: 5px;
        background: linear-gradient(to right, #ac3457, #1e274e);
        margin: 20px 0;
      "
    />

    <div class="container" [@slideInFromTop]>
      <app-trip-view></app-trip-view> <app-trip-view></app-trip-view>
      <app-trip-view></app-trip-view>
    </div>
  `,
  styles: [
    `
      .trip-header {
        text-align: center;
        margin-bottom: -10px;
      }

      .trip-header h1 {
        font-size: 2.2rem;
        font-weight: 700;
        margin: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
      }

      .trip-header .subtitle {
        font-size: 1.1rem;
        color: #666;
        margin: 10px 0 15px;
        font-style: italic;
      }

      .gradient-text {
        font-size: 2.2rem;
        background: linear-gradient(to right, #ac3457, #1e274e);
        -webkit-background-clip: text;
        color: transparent;
        font-weight: 700;
        margin: 0;
      }

      .emoji {
        color: inherit;
      }

      .trip-header .subtitle {
        font-size: 1.1rem;
        color: #666;
        margin: 10px 0 15px;
        font-style: italic;
      }
      .container {
        margin: 0 auto;
        padding: 20px;
        background-color: #e6dbdb;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
    `,
  ],
})
export class DashboardComponent {}
