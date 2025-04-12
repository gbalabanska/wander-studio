import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  Output,
  ViewChild,
  OnInit,
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
    <mat-form-field appearance="outline">
      <input [placeholder]="placeholder" #inputField matInput />
    </mat-form-field>
  `,
  styles: [
    `
      .mat-form-field {
        width: 100%;
      }
    `,
  ],
})
export class PlaceAutocompleteComponent implements OnInit {
  @ViewChild('inputField') inputField!: ElementRef;

  @Input() placeholder = 'Enter address...';

  @Output() placeChanged = new EventEmitter<PlaceSearchResult>();

  autocomplete: google.maps.places.Autocomplete | undefined;

  constructor(private ngZone: NgZone) {}

  ngOnInit() {}

  ngAfterViewInit() {
    // Check if google.maps is available and initialize the autocomplete
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
      ? place?.photos[0].getUrl({ maxWidth: 500 })
      : undefined;
  }

  ngOnDestroy() {
    if (this.autocomplete) {
      google.maps.event.clearInstanceListeners(this.autocomplete);
    }
  }
}
