import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { GoogleMapsModule, MapDirectionsService } from '@angular/google-maps';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-trip-view',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: './trip-view.component.html',
  styleUrls: ['./trip-view.component.scss'],
})
export class TripViewComponent implements OnInit, OnDestroy {
  //TODO: този компонент трябва да ползва новите данни за пътуването от DTO-то
  zoomLevel = 6;
  mapCenter: { lat: number; lng: number } = { lat: 35.6895, lng: 139.6917 }; // Tokyo
  trip = {
    name: 'Exploring Japan',
    color: '#4b3f72',
    startDate: '2025-05-10',
    endDate: '2025-05-24',
    isSolo: false,
    friends: ['Alex', 'Jamie', 'Morgan'],
    pointsOfInterest: [
      {
        name: 'Tokyo Tower',
        location: { lat: 35.6586, lng: 139.7454 },
      },
      {
        name: 'Kyoto Bamboo Forest',
        location: { lat: 35.0094, lng: 135.6668 },
      },
      {
        name: 'Mt. Fuji',
        location: { lat: 35.3606, lng: 138.7274 },
      },
      {
        name: 'Osaka Castle',
        location: { lat: 34.6873, lng: 135.5262 },
      },
    ],
  };

  directionsResults: google.maps.DirectionsResult | undefined;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private mapDirectionsService: MapDirectionsService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.trip.pointsOfInterest.length > 1) {
      const waypoints: google.maps.DirectionsWaypoint[] =
        this.trip.pointsOfInterest.slice(1, -1).map((poi) => ({
          location: poi.location,
          stopover: true, // To ensure the route goes through these points
        }));

      const request: google.maps.DirectionsRequest = {
        origin: this.trip.pointsOfInterest[0].location,
        destination:
          this.trip.pointsOfInterest[this.trip.pointsOfInterest.length - 1]
            .location,
        waypoints: waypoints,
        travelMode: google.maps.TravelMode.DRIVING,
      };

      this.mapDirectionsService
        .route(request)
        .pipe(takeUntil(this.destroy$))
        .subscribe((response) => {
          this.directionsResults = response.result;
        });

      this.mapCenter = this.trip.pointsOfInterest[0].location;
    } else if (this.trip.pointsOfInterest.length === 1) {
      this.mapCenter = this.trip.pointsOfInterest[0].location;
      this.zoomLevel = 14; // Zoom in if only one point
    }
  }

  redirectToEditTrip() {
    this.router.navigate(['/layout/edit-trip']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
