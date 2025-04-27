import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NewTripComponent } from './pages/new-trip/new-trip.component';
import { FriendsComponent } from './pages/friends/friends.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { AuthGuard } from './authentication/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'logout', component: LoginComponent },

  {
    path: 'layout',
    component: LayoutComponent,
    canActivate: [AuthGuard], // <--- add the guard here
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'friends', component: FriendsComponent },
      { path: 'new-trip', component: NewTripComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // default when inside layout
    ],
  },

  { path: '**', redirectTo: 'login' }, // wildcard for unknown routes
];
