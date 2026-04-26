import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProfileService } from '../../src/app/core/services/profile.service';

describe('ProfileService', () => {
  let service: ProfileService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProfileService],
    });
    service = TestBed.inject(ProfileService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getProfile sends GET to /customer/profile/', () => {
    service.getProfile().subscribe();
    const req = http.expectOne(r => r.url.includes('/customer/profile/'));
    expect(req.request.method).toBe('GET');
    req.flush({ status: 'success', data: { name: 'Alice', phone_number: '+254700000000' } });
  });

  it('updateProfile sends PATCH to /customer/profile/', () => {
    service.updateProfile({ name: 'Bob' }).subscribe();
    const req = http.expectOne(r => r.url.includes('/customer/profile/'));
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ name: 'Bob' });
    req.flush({ status: 'success', data: { name: 'Bob', phone_number: '+254700000000' } });
  });
});
