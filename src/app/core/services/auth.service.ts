import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LoginRequest, RegisterRequest, AuthTokens, ApiResponse } from '../models/customer.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = `${environment.apiBaseUrl}/api/ecommerce/customer`;

  readonly isLoggedIn = signal<boolean>(this.hasToken());
  readonly userEmail = signal<string>(localStorage.getItem('user_email') ?? '');

  constructor(private http: HttpClient, private router: Router) {}

  register(data: RegisterRequest) {
    return this.http.post<ApiResponse>(`${this.baseUrl}/register/`, data);
  }

  login(data: LoginRequest) {
    return this.http.post<ApiResponse<AuthTokens>>(`${this.baseUrl}/login/`, data).pipe(
      tap(response => {
        if (response.status === 'success' && response.data) {
          localStorage.setItem('access_token', response.data.access);
          localStorage.setItem('refresh_token', response.data.refresh);
          localStorage.setItem('user_email', data.email);
          this.isLoggedIn.set(true);
          this.userEmail.set(data.email);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_email');
    this.isLoggedIn.set(false);
    this.userEmail.set('');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('access_token');
  }
}
