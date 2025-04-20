import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent],
  template: `
    <div class="router-outlet-wrapper">
      <router-outlet></router-outlet>
    </div>

    <style></style>
  `,
})
export class AppComponent {}
