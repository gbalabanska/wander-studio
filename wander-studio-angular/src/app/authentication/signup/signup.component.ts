import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { CommonModule } from '@angular/common';
import { ApiResponse } from '../../../models/reponse/api-response.model';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink, CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  // User model for the form
  user = {
    username: '',
    email: '',
    password: '',
    gender: '',
    roles: 'ROLE_USER',
  };

  // State for handling errors
  generalErrorMessage: string | null = null;
  validationErrors: { [key: string]: string } = {};

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    // Reset previous errors before a new submission
    this.generalErrorMessage = null;
    this.validationErrors = {};

    // Call the signup service to send the POST request
    this.authService.signup(this.user).subscribe({
      next: (response: ApiResponse<any>) => {
        console.log('User created successfully!', response);
        // Using an alert here for success is okay, but a temporary success message is better UX
        alert('Sign up successful! Please log in.');
        this.router.navigate(['/login']);
      },
      error: (error: HttpErrorResponse) => {
        if (error.error && error.error.message) {
          console.error('Signup error:', error.error.message);
          alert(error.error.message);
        }
      },
    });
  }
}
