/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import axios, { AxiosResponse } from 'axios';

/* logic imports */
import { FormValidationError, UnauthorizedError } from '@daigaku/errors';

/* interface, type, enum, schema imports */
import { CoreErrorResponse, ErrorDetail } from '@daigaku/common-types';

export const apiClientWrapper = async <T>(axiosServiceCall: () => Promise<AxiosResponse<T>>): Promise<T> => {
  try {
    const response = await axiosServiceCall();

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const data = error.response?.data as CoreErrorResponse;

      if (status === 400) {
        const hasFieldErrors = data.errors.some((error: ErrorDetail) => {
          return error.fieldName;
        });

        if (hasFieldErrors) {
          throw new FormValidationError(data);
        }
      }

      if (status === 401) {
        throw new UnauthorizedError(data);
      }

      if (status && status >= 500) {
        // throw new ServerError(status);
      }
    }

    throw new Error('Unknown network error');
  }
};
