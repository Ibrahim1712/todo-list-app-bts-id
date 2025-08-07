export interface User {
  username?: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterResponse {
  data: null;
}

export interface UpdateProfileRequest {
  first_name: string;
  last_name: string;
}

export interface UpdateProfileResponse {
  data: User;
}
