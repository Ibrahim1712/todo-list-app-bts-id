import type { APIResponse } from './api';

export interface APIError {
  response?: {
    data?: APIResponse<unknown>;
  };
  message?: string;
}

export const getErrorMessage = (error: unknown): string => {
  const apiError = error as APIError;
  return apiError?.response?.data?.message || 
         apiError?.message || 
         'An unexpected error occurred';
};
