import { Component } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  template: `
    <header class="top-bar">
      <h1>Wander Studio</h1>
    </header>
  `,
  styles: [
    `
      .top-bar {
        background: #34495e;
        color: white;
        padding: 16px;
        text-align: center;
      }
    `,
  ],
})
export class TopBarComponent {}
