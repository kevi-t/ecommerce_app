import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  loading = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  onSubmit(): void {
    this.errorMessage = '';
    this.loading = true;

    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/orders';
        this.router.navigateByUrl(returnUrl);
      },
      error: err => {
        this.loading = false;
        const body = err.error;
        if (body?.errors) {
          const msgs = Object.values(body.errors as Record<string, string[]>).flat();
          this.errorMessage = msgs.join(' ');
        } else {
          this.errorMessage = body?.message || 'Invalid login credentials.';
        }
      },
    });
  }
}
