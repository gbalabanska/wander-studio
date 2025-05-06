import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  Output,
  ViewChild,
  OnInit,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

export interface PlaceSearchResult {
  address: string;
  location?: google.maps.LatLng;
  imageUrl?: string;
  iconUrl?: string;
  name?: string;
}

@Component({
  selector: 'app-place-autocomplete',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule],
  template: `
    <mat-form-field appearance="outline" class="full-width">
      <mat-label>{{ label }}</mat-label>
      <input
        #inputField
        matInput
        [placeholder]="placeholder"
        aria-label="Place search input"
      />
      <mat-hint>{{ hint }}</mat-hint>
    </mat-form-field>
  `,
  styles: [
    `
      .full-width {
        width: 100%;
      }

      input {
        font-size: 16px;
      }
    `,
  ],
})
export class PlaceAutocompleteComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('inputField') inputField!: ElementRef;

  @Input() placeholder = 'Type a city or address...';
  @Input() label = 'Destination or Stop';
  @Input() hint = 'e.g., Eiffel Tower, New York City, 1600 Amphitheatre Pkwy';

  @Output() placeChanged = new EventEmitter<PlaceSearchResult>();

  autocomplete: google.maps.places.Autocomplete | undefined;

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (typeof google !== 'undefined' && google.maps && google.maps.places) {
      this.autocomplete = new google.maps.places.Autocomplete(
        this.inputField.nativeElement
      );

      this.autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place = this.autocomplete?.getPlace();
          const result: PlaceSearchResult = {
            address: this.inputField.nativeElement.value,
            name: place?.name,
            location: place?.geometry?.location,
            imageUrl: this.getPhotoUrl(place),
            iconUrl: place?.icon,
          };

          this.placeChanged.emit(result);
        });
      });
    } else {
      console.error('Google Maps API not loaded');
    }
  }

  getPhotoUrl(
    place: google.maps.places.PlaceResult | undefined
  ): string | undefined {
    return place?.photos && place?.photos.length > 0
      ? place.photos[0].getUrl({ maxWidth: 500 })
      : undefined;
  }

  ngOnDestroy(): void {
    if (this.autocomplete) {
      google.maps.event.clearInstanceListeners(this.autocomplete);
    }
  }
}
