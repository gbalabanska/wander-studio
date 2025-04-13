import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GoogleMapsModule, MapDirectionsService } from '@angular/google-maps';

@Component({
  selector: 'app-trip-view',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  template: `
    <div class="trip-card">
      <div class="trip-header">
        <div
          class="trip-color"
          style="{ 'background-color': trip.color }"
        ></div>
        <h2>{{ trip.name }}</h2>
      </div>
      <p class="trip-dates">
        <i class="fa-solid fa-calendar-days"></i> {{ trip.startDate }} –
        {{ trip.endDate }}
      </p>
      <p class="trip-mode">
        <i class="fa-solid"></i>
        {{ trip.isSolo ? 'Solo Trip' : 'With Friends' }}
      </p>
      <ul *ngIf="!trip.isSolo" class="friends">
        <li *ngFor="let friend of trip.friends">
          <i class="fa-solid fa-user"></i> {{ friend }}
        </li>
      </ul>

      <div class="poi-section">
        <h3>Points of Interest 🗺️</h3>
        <ul class="pois">
          <li *ngFor="let poi of trip.pointsOfInterest">
            <i class="fa-solid fa-location-dot"></i> {{ poi }}
          </li>
        </ul>
      </div>

      <div class="map-placeholder">
        <div class="map-container">
          <h2>Map of Your Destinations</h2>
          <google-map
            height="400px"
            width="100%"
            [zoom]="zoomLevel"
            [center]="mapCenter"
          >
          </google-map>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .trip-card {
        background: #fff;
        border-radius: 12px;
        padding: 20px;
        box-shadow: 0 4px 10px rgba(231, 114, 120, 0.3);
        margin: 20px 0;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      }

      .trip-header {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .trip-color {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 2px solid #ccc;
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.15);
      }

      .trip-header h2 {
        margin: 0;
        color: #ac3457;
        font-size: 1.4rem;
      }

      .trip-dates,
      .trip-mode {
        margin: 10px 0;
        color: #555;
        font-size: 0.95rem;
      }

      .friends {
        list-style: none;
        padding-left: 0;
        margin: 5px 0 10px 0;
      }

      .friends li {
        font-size: 0.9rem;
        color: #333;
      }

      .poi-section h3 {
        margin-top: 20px;
        font-size: 1.1rem;
        color: #34495e;
      }

      .pois {
        list-style: none;
        padding-left: 0;
        margin: 0;
      }

      .pois li {
        font-size: 0.9rem;
        color: #4b3f72;
        margin-bottom: 6px;
      }

      .map-placeholder {
        margin-top: 20px;
        background: #f6f6f6;
        padding: 30px;
        text-align: center;
        border: 2px dashed #ccc;
        border-radius: 10px;
        color: #888;
      }
    `,
  ],
})
export class TripViewComponent {
  zoomLevel = 12; // Adjust initial zoom level
  mapCenter: { lat: number; lng: number } = { lat: 42.1354, lng: 24.7453 }; // Default to Plovdiv
  trip = {
    name: 'Exploring Japan 🇯🇵',
    color: '#e77278',
    startDate: '2025-05-10',
    endDate: '2025-05-24',
    isSolo: false,
    friends: ['Alex', 'Jamie', 'Morgan'],
    pointsOfInterest: [
      'Tokyo Tower',
      'Kyoto Bamboo Forest',
      'Mt. Fuji',
      'Osaka Castle',
    ],
  };
}
