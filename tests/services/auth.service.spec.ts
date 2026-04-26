import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { AuthService } from '../../src/app/core/services/auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let http: HttpTestingController;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    router = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, { provide: Router, useValue: router }],
    });
    service = TestBed.inject(AuthService);
    http = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    http.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('isLoggedIn returns false when no token in localStorage', () => {
    expect(service.isLoggedIn()).toBeFalse();
  });

  it('login stores tokens and sets isLoggedIn to true', () => {
    service.login({ email: 'test@example.com', password: 'pass' }).subscribe();
    const req = http.expectOne(r => r.url.includes('/login/'));
    req.flush({ status: 'success', data: { access: 'acc', refresh: 'ref' } });
    expect(service.isLoggedIn()).toBeTrue();
    expect(localStorage.getItem('access_token')).toBe('acc');
  });

  it('register calls POST /register/', () => {
    service.register({ name: 'A', email: 'a@b.com', phone_number: '0700000000', password: 'pass' }).subscribe();
    const req = http.expectOne(r => r.url.includes('/register/'));
    expect(req.request.method).toBe('POST');
    req.flush({ status: 'success' });
  });

  it('logout clears tokens and navigates to /login', () => {
    localStorage.setItem('access_token', 'tok');
    service.logout();
    expect(localStorage.getItem('access_token')).toBeNull();
    expect(service.isLoggedIn()).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('getToken returns null when not logged in', () => {
    expect(service.getToken()).toBeNull();
  });
});
