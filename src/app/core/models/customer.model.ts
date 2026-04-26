export interface Customer {
  name: string;
  phone_number: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  phone_number: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface ApiResponse<T = unknown> {
  status: 'success' | 'error';
  message?: string;
  data?: T;
  errors?: Record<string, string[]>;
}
