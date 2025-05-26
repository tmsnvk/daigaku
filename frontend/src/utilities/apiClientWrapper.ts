/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import axios, { AxiosResponse } from 'axios';

/* logic imports */
import { FormValidationError, ServerError, UnauthorizedError, UnexpectedError } from '@daigaku/errors';

/* interface, type, enum, schema imports */
import { ErrorDetail } from '@daigaku/common-types';

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
    const errorResponse = error.response?.data;

    if (statusCode === 400) {
      const hasFieldErrors = errorResponse.errors.some((errorDetail: ErrorDetail) => {
        return errorDetail.fieldName;
      });

      if (hasFieldErrors) {
        throw new FormValidationError(statusCode, errorResponse);
      }

      // TODO: add more error types here that have 40x status.
    }

    if (statusCode === 401) {
      throw new UnauthorizedError(statusCode, errorResponse);
    }

    if (statusCode && statusCode >= 500) {
      throw new ServerError(statusCode);
    }

    throw new UnexpectedError();
  }
};
