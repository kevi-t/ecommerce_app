import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProfileService } from '../../core/services/profile.service';
import { Customer } from '../../core/models/customer.model';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  profile: Customer | null = null;
  loading = true;
  errorMessage = '';

  constructor(private profileService: ProfileService, public auth: AuthService) {}

  ngOnInit(): void {
    this.profileService.getProfile().subscribe({
      next: res => {
        this.profile = res.data ?? null;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load profile.';
        this.loading = false;
      },
    });
  }
}
