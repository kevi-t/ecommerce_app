import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { OrderService } from '../../core/services/order.service';
import { Order } from '../../core/models/order.model';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './orders.component.html',
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  loading = true;
  errorMessage = '';
  successMessage = '';

  newItem = '';
  newAmount = '';
  placing = false;
  formErrors: Record<string, string> = {};

  constructor(private orderService: OrderService, private router: Router) {
    // Pre-fill from products page "Order Now"
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as { item?: string; amount?: number } | undefined;
    if (state?.item) {
      this.newItem = state.item;
      this.newAmount = String(state.amount ?? '');
    }
  }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading = true;
    this.orderService.listOrders().subscribe({
      next: res => { this.orders = res; this.loading = false; },
      error: () => { this.errorMessage = 'Failed to load orders.'; this.loading = false; },
    });
  }

  placeOrder(): void {
    this.formErrors = {};
    this.successMessage = '';
    this.placing = true;

    this.orderService.placeOrder({ item: this.newItem, amount: this.newAmount }).subscribe({
      next: response => {
        this.placing = false;
        this.successMessage = response.message || 'Order placed successfully!';
        this.newItem = '';
        this.newAmount = '';
        this.loadOrders();
      },
      error: err => {
        this.placing = false;
        const body = err.error;
        if (body?.errors) {
          for (const [field, msgs] of Object.entries(body.errors as Record<string, string[]>)) {
            this.formErrors[field] = msgs[0];
          }
        } else {
          this.errorMessage = body?.message || 'Failed to place order.';
        }
      },
    });
  }
}
