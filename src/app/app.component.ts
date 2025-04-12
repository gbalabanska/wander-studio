import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent],
  template: ` <app-layout></app-layout> `,
})
export class AppComponent {}

// import { Component } from '@angular/core';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { CommonModule } from '@angular/common';
// import { GoogleMapsModule, MapDirectionsService } from '@angular/google-maps';
// import { BehaviorSubject, map } from 'rxjs';
// import {
//   PlaceAutocompleteComponent,
//   PlaceSearchResult,
// } from './pages/maps/place-autocomplete.component';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [
//     MatToolbarModule,
//     PlaceAutocompleteComponent,
//     CommonModule,
//     GoogleMapsModule, // Import Google Maps module
//   ],
//   template: `
//     <mat-toolbar color="primary"> My Journey Planner </mat-toolbar>

//     <div class="container">
//       <div class="input-area">
//         <h2>Pick your destinations</h2>
//         <app-place-autocomplete
//           (placeChanged)="onPlaceChanged($event)"
//           placeholder="Enter address..."
//         ></app-place-autocomplete>
//       </div>

//       <div *ngFor="let fromPlace of fromPlaces">
//         <p>{{ fromPlace.address }}</p>
//       </div>

//       <div class="map-container" *ngIf="fromPlaces.length > 0">
//         <h2>Map of Your Destinations</h2>
//         <google-map
//           height="400px"
//           width="100%"
//           [zoom]="zoomLevel"
//           [center]="mapCenter"
//         >
//           <map-marker
//             *ngFor="let place of fromPlaces"
//             [position]="{
//               lat: place.location?.lat()!,
//               lng: place.location?.lng()!
//             }"
//             [title]="place.name || place.address"
//           ></map-marker>

//           <map-directions-renderer
//             *ngIf="directions$ | async as directions"
//             [directions]="directions"
//           ></map-directions-renderer>
//         </google-map>
//       </div>

//       <div *ngIf="fromPlaces.length === 0">
//         <p>No destinations selected yet to show on the map.</p>
//       </div>
//     </div>
//   `,
//   styles: [
//     `
//       .container {
//         display: flex;
//         flex-direction: column;
//         align-items: center;
//         padding: 20px;
//       }

//       .input-area {
//         margin-bottom: 20px;
//         width: 100%;
//         max-width: 500px;
//       }

//       .map-container {
//         margin-top: 20px;
//         width: 100%;
//         max-width: 800px;
//       }
//     `,
//   ],
// })
// export class AppComponent {
//   fromPlaces: PlaceSearchResult[] = [];
//   zoomLevel = 12; // Adjust initial zoom level
//   mapCenter: { lat: number; lng: number } = { lat: 42.6977, lng: 23.3242 }; // Default to Sofia

//   directions$ = new BehaviorSubject<google.maps.DirectionsResult | null>(null);

//   constructor(private directionsService: MapDirectionsService) {}

//   onPlaceChanged(place: PlaceSearchResult) {
//     if (place && place.address && place.location) {
//       this.fromPlaces.push(place);

//       // Focus on the last added place
//       this.mapCenter = {
//         lat: place.location.lat(),
//         lng: place.location.lng(),
//       };

//       console.log('Updated center:', this.mapCenter);

//       // If at least 2 locations exist, request a route
//       if (this.fromPlaces.length > 1) {
//         this.getRoute();
//       }
//     }
//   }

//   getRoute() {
//     if (this.fromPlaces.length < 2) return;

//     // Ensure all locations are valid
//     const validPlaces = this.fromPlaces.filter(
//       (place) => place.location !== undefined
//     );

//     if (validPlaces.length < 2) {
//       console.error('Not enough valid locations to calculate a route.');
//       return;
//     }

//     const waypoints = validPlaces.slice(1, -1).map((place) => ({
//       location: place.location as google.maps.LatLng, // Ensure it's not undefined
//       stopover: true,
//     }));

//     const request: google.maps.DirectionsRequest = {
//       origin: validPlaces[0].location as google.maps.LatLng,
//       destination: validPlaces[validPlaces.length - 1]
//         .location as google.maps.LatLng,
//       waypoints: waypoints,
//       travelMode: google.maps.TravelMode.DRIVING,
//     };

//     this.directionsService
//       .route(request)
//       .pipe(map((response) => response.result || null)) // Ensure response is not undefined
//       .subscribe((result) => {
//         this.directions$.next(result);
//       });
//   }
// }
