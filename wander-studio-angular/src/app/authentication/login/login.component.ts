import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['Gabby Balabanska', [Validators.required]],
      password: ['1', [Validators.required]],
    });
  }

  ngOnInit(): void {
    console.log('Login component initialized');
    this.authService.logout().subscribe({
      next: () => {
        console.log('User logged out');
      },
      error: (err) => {
        console.error('Logout failed:', err);
      },
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;

      this.authService.login(username, password).subscribe({
        next: (response: any) => {
          console.log(response);
          this.router.navigate(['/layout/dashboard']);
        },
        error: () => {
          alert('Login failed. Please check your credentials.');
        },
      });
    }
  }
}
