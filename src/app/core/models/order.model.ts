export interface Order {
  id: number;
  customer: number;
  item: string;
  amount: string;
  time: string;
}

export interface PlaceOrderRequest {
  item: string;
  amount: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
