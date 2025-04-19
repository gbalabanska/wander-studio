// routes.ts or app-routing.module.ts
import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NewTripComponent } from './pages/new-trip/new-trip.component';
import { FriendsComponent } from './pages/friends/friends.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'friends', component: FriendsComponent },
  { path: 'new-trip', component: NewTripComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Redirect to Dashboard by default
];
