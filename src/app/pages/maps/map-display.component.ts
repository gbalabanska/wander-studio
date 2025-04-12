import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  GoogleMap,
  GoogleMapsModule,
  MapDirectionsService,
} from '@angular/google-maps';
import { PlaceSearchResult } from './place-autocomplete.component';
import { BehaviorSubject, map } from 'rxjs';

@Component({
  selector: 'app-map-display',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  template: `
    <google-map #map [zoom]="zoom" width="100%" height="100%">
      <map-marker
        *ngFor="let markerPosition of markerPositions"
        [position]="markerPosition"
      >
      </map-marker>
    </google-map>
  `,
  styles: [``],
})
export class MapDisplayComponent implements OnInit {
  @ViewChild('map', { static: true })
  map!: GoogleMap;

  @Input()
  from: PlaceSearchResult | undefined;
  @Input()
  places: PlaceSearchResult[] | undefined;

  markerPositions: google.maps.LatLng[] = [];

  zoom = 5;

  directionsResult$ = new BehaviorSubject<
    google.maps.DirectionsResult | undefined
  >(undefined);

  constructor(private directionsService: MapDirectionsService) {}

  ngOnInit(): void {}

  ngOnChanges() {
    const fromLocation = this.from?.location;

    if (fromLocation) {
      this.gotoLocation(fromLocation);
    }
  }

  gotoLocation(location: google.maps.LatLng) {
    this.markerPositions = [location];
    this.map.panTo(location);
    this.zoom = 17;
    this.directionsResult$.next(undefined);
  }
}
