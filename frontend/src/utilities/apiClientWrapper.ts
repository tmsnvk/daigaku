/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import axios, { AxiosResponse } from 'axios';

/* logic imports */
import {
  DataIntegrityViolationError,
  FormValidationError,
  ServerError,
  UnauthorizedError,
  UnexpectedError,
} from '@daigaku/errors';

/* interface, type imports */
import { CoreInputErrorResponse, ExceptionTypes } from '@daigaku/common-types';

/**
 *
 * @param axiosServiceCall
 */
export const apiClientWrapper = async <T>(axiosServiceCall: () => Promise<AxiosResponse<T>>): Promise<T> => {
  try {
    const response = await axiosServiceCall();

    return response.data;
  } catch (error: unknown) {
    if (!axios.isAxiosError(error)) {
      throw new UnexpectedError();
    }

    const statusCode = error.response?.status;

    if (statusCode) {
      const errorResponse: CoreInputErrorResponse = error.response?.data;
      const exceptionType: string = errorResponse.exceptionType;

      if (exceptionType === ExceptionTypes.METHOD_ARGUMENT_NOT_VALID) {
        throw new FormValidationError(statusCode, errorResponse);
      }

      if (exceptionType === ExceptionTypes.BAD_CREDENTIALS) {
        throw new UnauthorizedError(statusCode, errorResponse);
      }

      if (exceptionType === ExceptionTypes.DATA_INTEGRITY_VIOLATION) {
        throw new DataIntegrityViolationError(statusCode, errorResponse);
      }

      // TODO: add more error types here as needed that have 40x status.

      if (statusCode >= 500) {
        throw new ServerError(statusCode);
      }
    }

    throw new UnexpectedError();
  }
};
