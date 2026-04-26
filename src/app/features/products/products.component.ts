import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

export interface Product {
  id: number;
  category: string;
  name: string;
  description: string;
  price: number;
  icon: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
})
export class ProductsComponent {
  selectedCategory = 'All';

  categories = ['All', 'Laptops', 'Phones', 'Tablets', 'Audio', 'TVs & Displays', 'Cameras'];

  products: Product[] = [
    { id: 1,  category: 'Laptops',       name: 'Dell XPS 15',            description: '15.6" OLED, Intel i7, 16GB RAM, 512GB SSD',         price: 185000, icon: 'fa fa-laptop' },
    { id: 2,  category: 'Laptops',       name: 'MacBook Pro M3',         description: '14" Retina, Apple M3, 16GB, 512GB SSD',             price: 220000, icon: 'fa fa-laptop' },
    { id: 3,  category: 'Laptops',       name: 'HP EliteBook 840',       description: '14" FHD, Intel i5, 8GB RAM, 256GB SSD',             price: 95000,  icon: 'fa fa-laptop' },
    { id: 4,  category: 'Laptops',       name: 'Lenovo ThinkPad X1',     description: '14" IPS, Intel i7, 16GB RAM, 1TB SSD',              price: 165000, icon: 'fa fa-laptop' },
    { id: 5,  category: 'Phones',        name: 'Samsung Galaxy S24',     description: '6.7" AMOLED, 12GB RAM, 256GB, 5G',                  price: 95000,  icon: 'fa fa-mobile' },
    { id: 6,  category: 'Phones',        name: 'iPhone 15 Pro',          description: '6.1" Super Retina XDR, 256GB, Titanium',            price: 175000, icon: 'fa fa-mobile' },
    { id: 7,  category: 'Phones',        name: 'Google Pixel 8',         description: '6.2" OLED, Google Tensor G3, 128GB',                price: 85000,  icon: 'fa fa-mobile' },
    { id: 8,  category: 'Phones',        name: 'Tecno Spark 20 Pro',     description: '6.78" FHD+, 8GB RAM, 256GB, 5000mAh',              price: 22000,  icon: 'fa fa-mobile' },
    { id: 9,  category: 'Tablets',       name: 'iPad Air 11"',           description: 'M2 chip, 256GB Wi-Fi, 10.9" Liquid Retina',         price: 95000,  icon: 'fa fa-tablet' },
    { id: 10, category: 'Tablets',       name: 'Samsung Galaxy Tab S9',  description: '11" AMOLED, Snapdragon 8 Gen 2, 128GB',             price: 75000,  icon: 'fa fa-tablet' },
    { id: 11, category: 'Audio',         name: 'Sony WH-1000XM5',        description: 'Over-ear, ANC, 30h battery, multipoint',            price: 32000,  icon: 'fa fa-headphones' },
    { id: 12, category: 'Audio',         name: 'JBL Flip 6',             description: 'Portable BT speaker, IP67, 12h battery',            price: 12000,  icon: 'fa fa-volume-up' },
    { id: 13, category: 'TVs & Displays', name: 'Samsung 55" QLED 4K',  description: '55" 4K QLED Smart TV, 120Hz, HDR10+',               price: 98000,  icon: 'fa fa-tv' },
    { id: 14, category: 'TVs & Displays', name: 'LG 27" UltraGear',     description: '27" QHD 165Hz IPS gaming monitor, 1ms',             price: 45000,  icon: 'fa fa-desktop' },
    { id: 15, category: 'Cameras',       name: 'Sony Alpha A7 IV',       description: '33MP full-frame mirrorless, 4K60, IBIS',            price: 280000, icon: 'fa fa-camera' },
    { id: 16, category: 'Cameras',       name: 'Canon EOS R50',          description: '24.2MP APS-C, 4K30, dual pixel AF',                price: 95000,  icon: 'fa fa-camera' },
  ];

  get filtered(): Product[] {
    return this.selectedCategory === 'All'
      ? this.products
      : this.products.filter(p => p.category === this.selectedCategory);
  }

  constructor(private router: Router) {}

  orderNow(product: Product): void {
    this.router.navigate(['/orders'], { state: { item: product.name, amount: product.price } });
  }
}
