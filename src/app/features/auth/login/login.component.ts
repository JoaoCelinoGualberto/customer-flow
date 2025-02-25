import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup; // Form group for login inputs
  errorMessage: string = ''; // Stores error messages
  isLoading: boolean = false; // Tracks loading state

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Initialize the login form with validators
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      empresa_id: [219, Validators.required],
      loja_id: [1, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true; // Set loading state to true
      this.errorMessage = ''; // Clear previous error messages

      // Call the login service
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.isLoading = false; // Reset loading state
          this.router.navigate(['/customers']); // Navigate to customers page on success
        },
        error: (error) => {
          this.isLoading = false; // Reset loading state
          this.errorMessage = error.error?.message || 'Login failed. Check your credentials.'; // Set error message
          console.error('Login error:', error); // Log the error
        },
      });
    } else {
      this.errorMessage = 'Please fill all fields correctly.'; // Set error message for invalid form
    }
  }
}