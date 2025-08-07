import HttpClient from "./httpClient";
import type { APIResponse } from "@/types/api";
import type {
  RegisterRequest,
  LoginRequest,
  LoginResponse,
} from "@/types/user";

class AuthService {
  private loginClient: HttpClient<LoginResponse>;
  private registerClient: HttpClient<null>;

  constructor() {
    this.loginClient = new HttpClient<LoginResponse>("/login");
    this.registerClient = new HttpClient<null>("/register");
  }

  register = (data: RegisterRequest): Promise<APIResponse<null>> => {
    return this.registerClient.post(data);
  };

  login = (data: LoginRequest): Promise<APIResponse<LoginResponse>> => {
    return this.loginClient.post(data);
  };
}

export const authService = new AuthService();
