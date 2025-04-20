import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { GoogleMapsModule, MapDirectionsService } from '@angular/google-maps';
import { BehaviorSubject } from 'rxjs';
import {
  PlaceAutocompleteComponent,
  PlaceSearchResult,
} from '../maps/place-autocomplete.component';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-new-trip',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    GoogleMapsModule,
    PlaceAutocompleteComponent,
  ],
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
  templateUrl: './new-trip.component.html',
  styleUrls: ['./new-trip.component.scss'],
})
export class NewTripComponent {
  fromPlaces: PlaceSearchResult[] = [];
  zoomLevel = 12; // Adjust initial zoom level
  mapCenter: { lat: number; lng: number } = { lat: 42.1354, lng: 24.7453 }; // Default to Plovdiv
  directions$ = new BehaviorSubject<google.maps.DirectionsResult | null>(null);

  // Define trip details (to be used in form)
  isSolo: boolean = false;
  friends: string[] = ['Alice', 'Bob', 'Charlie', 'Dana'];

  constructor(private directionsService: MapDirectionsService) {}

  onPlaceChanged(place: PlaceSearchResult) {
    if (place && place.address && place.location) {
      this.fromPlaces.push(place);

      // Focus on the last added place
      this.mapCenter = {
        lat: place.location.lat(),
        lng: place.location.lng(),
      };

      console.log('Updated center:', this.mapCenter);

      // If at least 2 locations exist, request a route
      if (this.fromPlaces.length > 1) {
        this.getRoute();
      }
    }
  }

  getRoute() {
    if (this.fromPlaces.length < 2) return;

    // Ensure all locations are valid
    const validPlaces = this.fromPlaces.filter(
      (place) => place.location !== undefined
    );

    if (validPlaces.length < 2) {
      console.error('Not enough valid locations to calculate a route.');
      return;
    }

    const waypoints = validPlaces.slice(1, -1).map((place) => ({
      location: place.location as google.maps.LatLng, // Ensure it's not undefined
      stopover: true,
    }));

    const request: google.maps.DirectionsRequest = {
      origin: validPlaces[0].location as google.maps.LatLng,
      destination: validPlaces[validPlaces.length - 1]
        .location as google.maps.LatLng,
      waypoints: waypoints,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    this.directionsService.route(request).subscribe((response) => {
      this.directions$.next(response.result || null); // Ensure response is not undefined
    });
  }

  // Move item up in the list
  moveUp(index: number) {
    if (index > 0) {
      const temp = this.fromPlaces[index];
      this.fromPlaces[index] = this.fromPlaces[index - 1];
      this.fromPlaces[index - 1] = temp;
      this.getRoute(); // Recalculate the route after movement
    }
  }

  // Move item down in the list
  moveDown(index: number) {
    if (index < this.fromPlaces.length - 1) {
      const temp = this.fromPlaces[index];
      this.fromPlaces[index] = this.fromPlaces[index + 1];
      this.fromPlaces[index + 1] = temp;
      this.getRoute(); // Recalculate the route after movement
    }
  }

  // Delete a selected city from the list
  deletePlace(index: number) {
    this.fromPlaces.splice(index, 1);
    this.getRoute(); // Recalculate the route after deletion
  }
}
