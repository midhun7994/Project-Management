import { apiClient } from './client';
import { User, LoginResponse } from '../types/auth';

export interface RegisterPayload {
  email: string;
  password: string;
  full_name: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const authApi = {
  // Register new account
  register: async (data: RegisterPayload): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/register', data);
    return response.data;
  },

  // Login existing account
  login: async (credentials: LoginPayload): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },

  // Get current logged in user profile
  getMe: async (): Promise<User> => {
    const response = await apiClient.get<User>('/auth/me');
    return response.data;
  },
};
