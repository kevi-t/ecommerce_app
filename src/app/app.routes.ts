import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { ProductsComponent } from './features/products/products.component';
import { OrdersComponent } from './features/orders/orders.component';
import { ProfileComponent } from './features/profile/profile.component';
import { ProfileEditComponent } from './features/profile/profile-edit.component';
import { ProfileSettingsComponent } from './features/profile/profile-settings.component';
import { NotFoundComponent } from './features/errors/not-found.component';
import { ServerErrorComponent } from './features/errors/server-error.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products', component: ProductsComponent, canActivate: [authGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [authGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'profile/edit', component: ProfileEditComponent, canActivate: [authGuard] },
  { path: 'profile/settings', component: ProfileSettingsComponent, canActivate: [authGuard] },
  { path: 'error/500', component: ServerErrorComponent },
  { path: '**', component: NotFoundComponent },
];
