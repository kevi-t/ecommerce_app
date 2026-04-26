import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { RegisterComponent } from '../../src/app/features/auth/register/register.component';
import { AuthService } from '../../src/app/core/services/auth.service';

describe('RegisterComponent', () => {
  let fixture: ComponentFixture<RegisterComponent>;
  let component: RegisterComponent;
  let auth: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    auth = jasmine.createSpyObj('AuthService', ['register', 'isLoggedIn', 'userEmail']);
    auth.isLoggedIn.and.returnValue(false);
    auth.userEmail.and.returnValue('');

    await TestBed.configureTestingModule({
      imports: [RegisterComponent, FormsModule, RouterTestingModule, HttpClientTestingModule],
      providers: [{ provide: AuthService, useValue: auth }],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows field errors returned by API', () => {
    auth.register.and.returnValue(throwError(() => ({
      error: { errors: { email: ['This email is already taken.'] } },
    })));
    component.name = 'Alice';
    component.email = 'alice@example.com';
    component.phone_number = '0712345678';
    component.password = 'strongpass1';
    component.onSubmit();
    expect(component.fieldErrors['email']).toBe('This email is already taken.');
  });

  it('shows success message on successful registration', () => {
    auth.register.and.returnValue(of({ status: 'success', message: 'Registered successfully.' }));
    component.name = 'Alice';
    component.email = 'alice@example.com';
    component.phone_number = '0712345678';
    component.password = 'strongpass1';
    component.onSubmit();
    expect(component.successMessage).toBe('Registered successfully.');
  });
});
