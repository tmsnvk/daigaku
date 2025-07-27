/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import axios, { AxiosResponse } from 'axios';
import { FieldValues, type Path, UseFormSetError } from 'react-hook-form';

/* logic imports */
import {
  ConstraintViolationError,
  CoreApiError,
  DataIntegrityViolationError,
  FormValidationError,
  MethodArgumentNotValidError,
  ServerError,
  UnauthorizedError,
  UnexpectedError,
} from '@daigaku/errors';

/* interface, type imports */
import { CoreInputErrorResponse, ExceptionTypes } from '@daigaku/common-types';

/**
 *
 */
interface ApiClient {
  /**
   *
   * @param axiosServiceCall
   * @returns
   */
  serviceWrapper: <TServiceCall>(axiosServiceCall: () => Promise<AxiosResponse<TServiceCall>>) => Promise<TServiceCall>;

  /**
   *
   */
  errorWrapper: <TFormValues extends FieldValues>(error: CoreApiError, setError: UseFormSetError<TFormValues>) => void;
}

export const apiClient: ApiClient = {
  serviceWrapper: async <TServiceCall>(
    axiosServiceCall: () => Promise<AxiosResponse<TServiceCall>>,
  ): Promise<TServiceCall> => {
    try {
      const { data } = await axiosServiceCall();

      return data;
    } catch (error: unknown) {
      if (!axios.isAxiosError(error)) {
        throw new UnexpectedError();
      }

      const statusCode = error.response?.status;

      if (statusCode) {
        const errorResponse: CoreInputErrorResponse = error.response?.data;
        const exceptionType: string = errorResponse.exceptionType;

        if (exceptionType === ExceptionTypes.METHOD_ARGUMENT_NOT_VALID) {
          throw new MethodArgumentNotValidError(statusCode, errorResponse);
        }

        if (exceptionType === ExceptionTypes.BAD_CREDENTIALS) {
          throw new UnauthorizedError(statusCode, errorResponse);
        }

        if (exceptionType === ExceptionTypes.DATA_INTEGRITY_VIOLATION) {
          throw new DataIntegrityViolationError(statusCode, errorResponse);
        }

        if (exceptionType === ExceptionTypes.FORM_VALIDATION) {
          throw new FormValidationError(statusCode, errorResponse);
        }

        if (exceptionType === ExceptionTypes.CONSTRAINT_VIOLATION) {
          throw new ConstraintViolationError(statusCode, errorResponse);
        }

        if (statusCode >= 500) {
          throw new ServerError(statusCode);
        }
      }

      throw new UnexpectedError();
    }
  },

  errorWrapper: <TFormValues extends FieldValues>(
    error: CoreApiError,
    setError: UseFormSetError<TFormValues>,
  ): void => {
    const errorResponse: CoreInputErrorResponse | undefined = error.coreError;

    if (error instanceof MethodArgumentNotValidError || error instanceof ConstraintViolationError) {
      errorResponse?.errors.forEach((err) => {
        if (err.fieldName) {
          setError(err.fieldName as Path<TFormValues>, { message: err.errorMessage });
        }
      });
    }

    if (
      error instanceof UnauthorizedError ||
      error instanceof DataIntegrityViolationError ||
      error instanceof FormValidationError
    ) {
      setError('root', { message: errorResponse?.errors[0].errorMessage });
    }
  },
};
