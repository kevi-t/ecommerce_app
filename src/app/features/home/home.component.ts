import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(public auth: AuthService) {}

  categories = [
    { icon: 'fa fa-laptop',   label: 'Laptops',     desc: 'Business, gaming & ultrabooks' },
    { icon: 'fa fa-mobile',   label: 'Phones',       desc: 'Smartphones & feature phones' },
    { icon: 'fa fa-tablet',   label: 'Tablets',      desc: 'iPads, Android & e-readers' },
    { icon: 'fa fa-headphones', label: 'Audio',       desc: 'Headphones, earbuds & speakers' },
    { icon: 'fa fa-tv',       label: 'TVs & Displays', desc: 'Smart TVs, monitors & projectors' },
    { icon: 'fa fa-camera',   label: 'Cameras',      desc: 'DSLRs, mirrorless & accessories' },
  ];
}
