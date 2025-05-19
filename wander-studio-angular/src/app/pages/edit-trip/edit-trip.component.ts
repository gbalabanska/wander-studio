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
import { FriendService } from '../../services/friends.service';
import { Friend } from '../../../models/dto/dtos';
import { TripDto } from '../../../models/dto/dtos';
import { EMOJI_OPTIONS, EmojiOption } from '../../shared/emoji-list';
import { MenuHeaderComponent } from '../../layout/menu-header/menu-header.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TripService } from '../../services/trip.service';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    GoogleMapsModule,
    PlaceAutocompleteComponent,
    MenuHeaderComponent,
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
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.scss'],
})
export class EditTripComponent {
  fromPlaces: PlaceSearchResult[] = [];
  zoomLevel = 12; // Adjust initial zoom level
  mapCenter: { lat: number; lng: number } = { lat: 42.1354, lng: 24.7453 }; // Default to Plovdiv
  directions$ = new BehaviorSubject<google.maps.DirectionsResult | null>(null);

  friends: Friend[] = [];

  emojiOptions: EmojiOption[] = EMOJI_OPTIONS;
  selectedEmojiId: string = 'car'; // default emoji
  invitedFriendIds: Set<number> = new Set();

  constructor(
    private directionsService: MapDirectionsService,
    private friendService: FriendService,
    private route: ActivatedRoute,
    private router: Router,
    private tripService: TripService
  ) {}

  trip: TripDto | null = null;
  tripId: number | null = null;

  ngOnInit(): void {
    this.loadFriends();
    this.getRoute();
    this.loadTrip(1); //todo refactor that
  }

  loadTrip(tripId: number): void {
    this.tripService.getTripById(tripId).subscribe({
      next: (response) => {
        if (response.data) {
          this.trip = response.data;
          console.log('Loaded trip:', this.trip);
          this.fillFormFields();
        }
      },
      error: (err) => {
        console.error('Error loading trip:', err);
      },
    });
  }

  fillFormFields(): void {
    if (this.trip) {
      const {
        name,
        dateFrom,
        dateTo,
        tripEmoji,
        description,
        friendIds,
        places,
      } = this.trip;

      (document.getElementById('trip-name') as HTMLInputElement).value = name;
      (document.getElementById('start-date') as HTMLInputElement).value =
        dateFrom;
      (document.getElementById('end-date') as HTMLInputElement).value = dateTo;
      (document.getElementById('trip-emoji') as HTMLInputElement).value =
        tripEmoji;
      (document.getElementById('trip-notes') as HTMLTextAreaElement).value =
        description;

      this.selectedEmojiId = tripEmoji;
      this.invitedFriendIds = new Set(friendIds);

      this.fromPlaces = places.map((place) => ({
        address: place.address,
        location: new google.maps.LatLng(place.latitude!, place.longitude!),
      }));
      this.getRoute();
    }
  }

  submitTrip() {
    const name = (document.getElementById('trip-name') as HTMLInputElement)
      .value;
    const dateFrom = (document.getElementById('start-date') as HTMLInputElement)
      .value;
    const dateTo = (document.getElementById('end-date') as HTMLInputElement)
      .value;
    const description = (
      document.getElementById('trip-notes') as HTMLTextAreaElement
    ).value;
    const selectedEmoji = this.selectedEmojiId;

    // Use the stateful Set for selected friends
    const friendIds = Array.from(this.invitedFriendIds);

    // Assemble the places from the state
    const places = this.fromPlaces.map((place) => ({
      address: place.address,
      latitude: place.location?.lat(),
      longitude: place.location?.lng(),
    }));

    const payload: TripDto = {
      name,
      dateFrom,
      dateTo,
      tripEmoji: selectedEmoji,
      description,
      friendIds,
      places,
    };

    console.log('Trip Payload:', payload);
    this.tripService.updateTrip(payload, 1).subscribe({
      next: (res) => {
        alert(res.message);
        // Optionally navigate to another page or show a success message
      },
      error: (err) => {
        console.error('Error creating trip:', err);
        alert('Error creating trip!');
        // Handle error (e.g., show a message to the user)
      },
    });
  }

  selectEmoji(id: string) {
    this.selectedEmojiId = id;
  }

  getSelectedEmoji() {
    return this.emojiOptions.find((e) => e.id === this.selectedEmojiId);
  }

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

  // Paging variables
  pageNumber: number = 0;
  totalPages: number = 0;
  toggleFriendInvitation(friendId: number, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.invitedFriendIds.add(friendId);
    } else {
      this.invitedFriendIds.delete(friendId);
    }
  }

  loadFriends() {
    this.friendService.getFriendList(this.pageNumber, 5).subscribe({
      next: (res) => {
        if (res.data) {
          this.friends = res.data.content;
          this.totalPages = res.data.totalPages; // ← ADD THIS
        } else {
          this.friends = [];
          this.totalPages = 0;
        }
        console.log('Loaded friends:', this.friends);
      },
      error: (err) => {
        console.error('Failed to load friends', err);
      },
    });
  }

  nextPage() {
    if (this.pageNumber + 1 < this.totalPages) {
      this.pageNumber++;
      this.loadFriends();
    }
  }

  prevPage() {
    if (this.pageNumber > 0) {
      this.pageNumber--;
      this.loadFriends();
    }
  }

  pageInput: number = 1; // User input for page number

  // Other existing methods...

  jumpToPage() {
    // If the input is invalid (greater than totalPages), reset to page 1
    if (this.pageInput < 1 || this.pageInput > this.totalPages) {
      this.pageInput = 1;
    }

    this.pageNumber = this.pageInput - 1; // Convert to zero-based index
    this.loadFriends(); // Load the friends of the chosen page
  }

  // Pagination state for places
  placePageNumber: number = 0;
  placesPerPage: number = 5;
  placePageInput: number = 1;

  get placeTotalPages(): number {
    return Math.ceil(this.fromPlaces.length / this.placesPerPage);
  }

  get pagedPlaces() {
    const start = this.placePageNumber * this.placesPerPage;
    return this.fromPlaces.slice(start, start + this.placesPerPage);
  }

  prevPlacePage() {
    if (this.placePageNumber > 0) this.placePageNumber--;
  }

  nextPlacePage() {
    if (this.placePageNumber + 1 < this.placeTotalPages) this.placePageNumber++;
  }

  jumpToPlacePage() {
    const page = this.placePageInput - 1;
    if (page >= 0 && page < this.placeTotalPages) {
      this.placePageNumber = page;
    }
  }

  getMapLabel(index: number): string {
    return String.fromCharCode(65 + index);
  }
}
