import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { GoogleMapsModule, MapDirectionsService } from '@angular/google-maps';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { TripService } from '../../services/trip.service';
import { EMOJI_OPTIONS, EmojiOption } from '../../shared/emoji-list';

@Component({
  selector: 'app-trip-view',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: './trip-view.component.html',
  styleUrls: ['./trip-view.component.scss'],
})
export class TripViewComponent implements OnInit, OnDestroy {
  zoomLevel = 12;
  mapCenter: { lat: number; lng: number } = { lat: 42.1354, lng: 24.7453 }; // fallback center
  directions$ = new BehaviorSubject<google.maps.DirectionsResult | null>(null);
  directionsResults: google.maps.DirectionsResult | undefined;
  private readonly destroy$ = new Subject<void>();
  @Input() trip: any;
  emojiOptions: EmojiOption[] = EMOJI_OPTIONS;
  selectedEmojiId: string = 'car'; // default emoji

  constructor(
    private mapDirectionsService: MapDirectionsService,
    private router: Router,
    private tripService: TripService // Inject your TripService here
  ) {}

  ngOnInit(): void {
    if (this.trip?.places?.length > 0) {
      const first = this.trip.places[0];
      this.mapCenter = { lat: first.latitude, lng: first.longitude };
      this.getRoute();
    }
  }

  getRoute(): void {
    const places = this.trip?.places;
    if (!places || places.length < 2) return;

    const validPlaces = places.filter(
      (p: { latitude: any; longitude: any }) => p.latitude && p.longitude
    );

    const waypoints = validPlaces
      .slice(1, -1)
      .map((place: { latitude: any; longitude: any }) => ({
        location: { lat: place.latitude, lng: place.longitude },
        stopover: true,
      }));

    const request: google.maps.DirectionsRequest = {
      origin: { lat: validPlaces[0].latitude, lng: validPlaces[0].longitude },
      destination: {
        lat: validPlaces[validPlaces.length - 1].latitude,
        lng: validPlaces[validPlaces.length - 1].longitude,
      },
      waypoints,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    this.mapDirectionsService.route(request).subscribe((res) => {
      this.directionsResults = res.result || undefined;
    });
  }

  getSelectedEmoji() {
    return this.emojiOptions.find((e) => e.id === this.trip.tripEmoji);
  }

  redirectToEditTrip() {
    this.router.navigate(['/layout/edit-trip', this.trip.id]);
  }

  deleteTrip() {
    this.tripService.deleteTrip(this.trip.id).subscribe({
      next: (response) => {
        console.log('Trip deleted successfully', response);
        window.location.reload();
      },
      error: (error) => {
        alert('Error deleting trip. Only the owner can delete a trip.');
        console.error('Error deleting trip', error);
      },
    });
  }

  get tripDateRange(): string {
    const from = new Date(this.trip.dateFrom).toLocaleDateString();
    const to = new Date(this.trip.dateTo).toLocaleDateString();
    return `${from} – ${to}`;
  }

  get visiblePlaces() {
    return this.trip.places?.slice(0, 3) || [];
  }

  get remainingPlacesCount() {
    return Math.max(0, (this.trip.places?.length || 0) - 3);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
