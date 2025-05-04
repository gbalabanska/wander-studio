import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <header class="trip-header">
      <h1>{{ header }}</h1>
      <p class="subtitle">{{ subtitle }}</p>
      <div class="header-gradient"></div>
    </header>

    <hr class="header-divider" />
  `,
  styles: [
    `
      .trip-header {
        text-align: center;
        margin-bottom: -10px;
      }

      .trip-header h1 {
        font-size: 2.2rem;
        background: linear-gradient(to right, #ac3457, #1e274e);
        -webkit-background-clip: text;
        color: transparent;
        font-weight: 700;
      }

      .trip-header .subtitle {
        font-size: 1.1rem;
        color: #666;
        margin: 10px 0 15px;
        font-style: italic;
      }

      .header-input,
      .subtitle-input {
        display: block;
        margin: 10px auto;
        padding: 10px;
        font-size: 1rem;
        width: 80%;
        max-width: 500px;
        border: 1px solid #ccc;
        border-radius: 5px;
      }

      .header-input {
        font-weight: bold;
      }

      .subtitle-input {
        font-style: italic;
      }

      /* Styles for the hr */
      .header-divider {
        border: 0;
        height: 5px;
        background: linear-gradient(to right, #ac3457, #1e274e);
        margin: 20px 0;
      }
    `,
  ],
})
export class MenuHeaderComponent {
  @Input() header!: string;
  @Input() subtitle!: string;
}
