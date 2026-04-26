import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { LoginComponent } from '../../src/app/features/auth/login/login.component';
import { AuthService } from '../../src/app/core/services/auth.service';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent;
  let auth: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    auth = jasmine.createSpyObj('AuthService', ['login', 'isLoggedIn', 'userEmail']);
    auth.isLoggedIn.and.returnValue(false);
    auth.userEmail.and.returnValue('');

    await TestBed.configureTestingModule({
      imports: [LoginComponent, FormsModule, RouterTestingModule, HttpClientTestingModule],
      providers: [{ provide: AuthService, useValue: auth }],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows error message on failed login', () => {
    auth.login.and.returnValue(throwError(() => ({
      error: { message: 'Invalid credentials.' },
    })));
    component.email = 'bad@test.com';
    component.password = 'wrong';
    component.onSubmit();
    expect(component.errorMessage).toBe('Invalid credentials.');
  });

  it('clears error on new submission', () => {
    auth.login.and.returnValue(of({ status: 'success', data: { access: 'a', refresh: 'r' } }));
    component.errorMessage = 'old error';
    component.onSubmit();
    expect(component.errorMessage).toBe('');
  });
});
