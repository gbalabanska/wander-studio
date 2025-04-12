// routes.ts or app-routing.module.ts
import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { NewTripComponent } from './pages/new-trip/new-trip.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'new-trip', component: NewTripComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Redirect to Dashboard by default
];
