import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  name = '';
  email = '';
  phone_number = '';
  password = '';
  successMessage = '';
  errorMessage = '';
  fieldErrors: Record<string, string> = {};
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.fieldErrors = {};
    this.loading = true;

    this.auth.register({ name: this.name, email: this.email, phone_number: this.phone_number, password: this.password }).subscribe({
      next: response => {
        this.loading = false;
        this.successMessage = response.message || 'Registered successfully. Please log in.';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: err => {
        this.loading = false;
        const body = err.error;
        if (body?.errors) {
          for (const [field, msgs] of Object.entries(body.errors as Record<string, string[]>)) {
            this.fieldErrors[field] = msgs[0];
          }
        } else {
          this.errorMessage = body?.message || 'Registration failed. Please try again.';
        }
      },
    });
  }
}
