import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core'; // Import OnInit
import { RouterModule } from '@angular/router';
import { TripViewComponent } from '../trip-view/trip-view.component';
import { TripService } from '../../services/trip.service';
import { TripDto } from '../../../models/dto/dtos';

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
      <ng-container *ngIf="trips && trips.length > 0; else noTrips">
        <app-trip-view *ngFor="let trip of trips" [trip]="trip"></app-trip-view>
      </ng-container>

      <ng-template #noTrips>
        <div class="no-trips-message">
          <p>
            No trip available, try creating first, or ask your friends to add
            you
          </p>
          <button routerLink="/layout/new-trip" class="create-trip-button">
            🌍 Create New Trip
          </button>
        </div>
      </ng-template>
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

      .no-trips-message {
        text-align: center;
        padding: 30px;
        font-size: 1.2em;
        color: #555;
        background-color: #f8f8f8;
        border-radius: 5px;
        margin-top: 20px;
      }

      .no-trips-message p {
        margin-bottom: 20px;
        line-height: 1.5;
      }

      .create-trip-button {
        background-color: #ac3457;
        color: white;
        padding: 12px 25px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1em;
        transition: background-color 0.3s ease;
      }

      .create-trip-button:hover {
        background-color: #8e2b49;
      }
    `,
  ],
})
export class DashboardComponent implements OnInit {
  // Implement OnInit
  trips: TripDto[] | null = null; // Initialize as null to differentiate between no data loaded and empty array

  constructor(private tripService: TripService) {}

  ngOnInit() {
    this.tripService.getAllTrips().subscribe({
      next: (res) => {
        this.trips = res.data;
      },
      error: (err) => {
        console.error('Error fetching trips', err);
        this.trips = []; // Set to empty array on error to display the message
      },
    });
  }
}
