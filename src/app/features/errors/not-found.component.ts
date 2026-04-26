import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="auth-card" style="text-align:center;">
      <h1 style="font-size:80px; color:#0073e6; margin:0;">404</h1>
      <h3>Page Not Found</h3>
      <p class="text-muted">The page you are looking for does not exist.</p>
      <a routerLink="/" class="btn btn-primary">Go Home</a>
    </div>
  `,
})
export class NotFoundComponent {}
