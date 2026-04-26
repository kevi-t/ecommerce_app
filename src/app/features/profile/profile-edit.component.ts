import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProfileService } from '../../core/services/profile.service';

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './profile-edit.component.html',
})
export class ProfileEditComponent implements OnInit {
  name = '';
  phone_number = '';
  successMessage = '';
  errorMessage = '';
  fieldErrors: Record<string, string> = {};
  loading = true;
  saving = false;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.getProfile().subscribe({
      next: res => {
        this.name = res.data?.name ?? '';
        this.phone_number = res.data?.phone_number ?? '';
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load profile.';
        this.loading = false;
      },
    });
  }

  onSave(): void {
    this.fieldErrors = {};
    this.successMessage = '';
    this.errorMessage = '';
    this.saving = true;

    this.profileService.updateProfile({ name: this.name, phone_number: this.phone_number }).subscribe({
      next: response => {
        this.saving = false;
        this.successMessage = response.message || 'Profile updated successfully.';
      },
      error: err => {
        this.saving = false;
        const body = err.error;
        if (body?.errors) {
          for (const [field, msgs] of Object.entries(body.errors as Record<string, string[]>)) {
            this.fieldErrors[field] = msgs[0];
          }
        } else {
          this.errorMessage = body?.message || 'Failed to update profile.';
        }
      },
    });
  }
}
