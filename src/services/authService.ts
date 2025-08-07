import HttpClient from "./httpClient";
import type { APIResponse } from "@/types/api";
import type {
  RegisterRequest,
  LoginRequest,
  LoginResponse,
} from "@/types/user";
import type { ProfileResponse } from "./profileService";

class AuthService {
  private loginClient: HttpClient<LoginResponse>;
  private registerClient: HttpClient<null>;
  private profileClient: HttpClient<ProfileResponse>;

  constructor() {
    this.loginClient = new HttpClient<LoginResponse>("/login");
    this.registerClient = new HttpClient<null>("/register");
    this.profileClient = new HttpClient<ProfileResponse>("/profile");
  }

  register = (data: RegisterRequest): Promise<APIResponse<null>> => {
    return this.registerClient.post(data);
  };

  login = (data: LoginRequest): Promise<APIResponse<LoginResponse>> => {
    return this.loginClient.post(data);
  };

  getProfile = (): Promise<APIResponse<ProfileResponse>> => {
    return this.profileClient.axiosInstance
      .get<APIResponse<ProfileResponse>>("/profile")
      .then((res) => res.data);
  };
}

export const authService = new AuthService();
