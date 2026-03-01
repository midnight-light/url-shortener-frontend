import type { ApiErrorResponse } from '../api.types';
import { AxiosError } from 'axios';

const ErrorConstructor = Error as unknown as {
  captureStackTrace?: (target: object, constructor: Function) => void;
};

export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly errors?: Record<string, string[]>;
  public readonly originalError?: unknown;

  constructor(message: string, statusCode: number, errors?: Record<string, string[]>, originalError?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.errors = errors;
    this.originalError = originalError;

    if (ErrorConstructor.captureStackTrace) {
      ErrorConstructor.captureStackTrace(this, ApiError);
    }
  }
}

/**
 * @description Transforms axios error into application ApiError
 */
export const handleApiError = (error: unknown): ApiError => {
  if (error instanceof ApiError) {
    return error;
  }

  if (error instanceof AxiosError) {
    const response = error.response?.data as ApiErrorResponse | undefined;

    return new ApiError(
      response?.message || error.message || 'An unexpected error occurred',
      error.response?.status || 500,
      response?.errors,
      error,
    );
  }

  if (error instanceof Error) {
    return new ApiError(error.message, 500, undefined, error);
  }

  return new ApiError('An unexpected error occurred', 500, undefined, error);
};

export const isApiErrorWithStatus = (error: unknown, statusCode: number): error is ApiError => {
  return error instanceof ApiError && error.statusCode === statusCode;
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof ApiError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred';
};
