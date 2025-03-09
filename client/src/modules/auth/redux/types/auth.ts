export interface LoginResponse {
  statusCode: number;
  success: boolean;
  data: {
    access_token: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}
