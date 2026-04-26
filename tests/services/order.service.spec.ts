import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OrderService } from '../../src/app/core/services/order.service';

describe('OrderService', () => {
  let service: OrderService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrderService],
    });
    service = TestBed.inject(OrderService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('placeOrder sends POST to /order/', () => {
    service.placeOrder({ item: 'Laptop', amount: '1200' }).subscribe();
    const req = http.expectOne(r => r.url.includes('/order/'));
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ item: 'Laptop', amount: '1200' });
    req.flush({ status: 'success', data: { id: 1, item: 'Laptop', amount: '1200.00', time: '' } });
  });

  it('listOrders sends GET to /order/', () => {
    service.listOrders().subscribe();
    const req = http.expectOne(r => r.url.includes('/order/'));
    expect(req.request.method).toBe('GET');
    req.flush({ count: 0, results: [] });
  });
});
