import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Customer, ApiResponse } from '../models/customer.model';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly profileUrl = `${environment.apiBaseUrl}/api/ecommerce/customer/profile/`;

  constructor(private http: HttpClient) {}

  getProfile() {
    return this.http.get<ApiResponse<Customer>>(this.profileUrl);
  }

  updateProfile(data: Partial<Customer>) {
    return this.http.patch<ApiResponse<Customer>>(this.profileUrl, data);
  }
}
