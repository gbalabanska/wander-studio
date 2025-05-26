import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="router-outlet-wrapper">
      <router-outlet></router-outlet>
    </div>

    <style></style>
  `,
})
export class AppComponent {}
