import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import { TopBarComponent } from '../top-bar/top-bar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SideMenuComponent, TopBarComponent, RouterOutlet],
  template: `
    <div class="layout">
      <app-side-menu></app-side-menu>
      <div class="content">
        <div class="page-content">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .layout {
        display: flex;
        height: 100vh;
      }
      .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding-left: 250px; /* Add left padding to push content to the right */
      }
      .page-content {
        flex-grow: 1;
        padding: 16px;
      }
    `,
  ],
})
export class LayoutComponent {}
