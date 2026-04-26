import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { authGuard } from '../../src/app/core/guards/auth.guard';
import { AuthService } from '../../src/app/core/services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('authGuard', () => {
  let router: jasmine.SpyObj<Router>;
  let auth: jasmine.SpyObj<AuthService>;

  const route = {} as ActivatedRouteSnapshot;
  const state = { url: '/orders' } as RouterStateSnapshot;

  beforeEach(() => {
    router = jasmine.createSpyObj('Router', ['navigate', 'createUrlTree', 'parseUrl']);
    router.parseUrl.and.returnValue({} as any);
    auth = jasmine.createSpyObj('AuthService', ['isLoggedIn', 'getToken']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: Router, useValue: router },
        { provide: AuthService, useValue: auth },
      ],
    });
  });

  it('allows access when user is logged in', () => {
    auth.isLoggedIn.and.returnValue(true);
    const result = TestBed.runInInjectionContext(() => authGuard(route, state));
    expect(result).toBeTrue();
  });

  it('redirects to /login when user is not logged in', () => {
    auth.isLoggedIn.and.returnValue(false);
    router.createUrlTree.and.returnValue({} as any);
    TestBed.runInInjectionContext(() => authGuard(route, state));
    expect(router.createUrlTree).toHaveBeenCalledWith(['/login'], jasmine.any(Object));
  });
});
