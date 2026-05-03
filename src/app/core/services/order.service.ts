import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Order, PlaceOrderRequest } from '../models/order.model';
import { ApiResponse } from '../models/customer.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly baseUrl = `${environment.apiBaseUrl}/api/ecommerce/order/`;

  constructor(private http: HttpClient) {}

  placeOrder(data: PlaceOrderRequest) {
    return this.http.post<ApiResponse<Order>>(this.baseUrl, data);
  }

  listOrders() {
    return this.http.get<Order[]>(this.baseUrl);
  }
}
