import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-new-trip',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './new-trip.component.html',
  styleUrls: ['./new-trip.component.scss'],
  animations: [
    trigger('slideInFromTop', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', opacity: 0 }), // Initial state: offscreen
        animate(
          '0.8s cubic-bezier(0.25, 0.8, 0.25, 1)', // Smoother animation with cubic-bezier easing
          style({ transform: 'translateY(0)', opacity: 1 })
        ),
      ]),
    ]),
  ],
})
export class NewTripComponent {
  isSolo: boolean = false;
  friends: string[] = ['Alice', 'Bob', 'Charlie', 'Dana'];
}
