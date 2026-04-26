import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-server-error',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="auth-card" style="text-align:center;">
      <h1 style="font-size:80px; color:#c0392b; margin:0;">500</h1>
      <h3>Server Error</h3>
      <p class="text-muted">Something went wrong on our end. Please try again later.</p>
      <a routerLink="/" class="btn btn-primary">Go Home</a>
    </div>
  `,
})
export class ServerErrorComponent {}
