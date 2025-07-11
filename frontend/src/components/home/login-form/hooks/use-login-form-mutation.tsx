/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';

/* logic imports */
import { CoreApiError, MethodArgumentNotValidError, UnauthorizedError } from '@daigaku/errors';
import { useAuthenticationProvider } from '@daigaku/providers';
import { accountService } from '@daigaku/services';
import { LoginSchemaKey } from '../schema.ts';

/* configuration, constants imports */
import { mutationKeys } from '@daigaku/constants';

/* interface, type imports */
import { CoreInputErrorResponse, InputViolation, LoginPayload, LoginResponse } from '@daigaku/common-types';

/**
 * Manages the login form submission.
 *
 * @param setError The `react-hook-form` method to set form errors.
 * @return {UseMutationResult<LoginResponse, CoreApiError, LoginPayload>}
 */
export const useLoginFormMutation = (
  setError: UseFormSetError<LoginPayload>,
): UseMutationResult<LoginResponse, CoreApiError, LoginPayload> => {
  const { logIn } = useAuthenticationProvider();

  return useMutation({
    mutationKey: [mutationKeys.account.POST_LOGIN_FORM],
    mutationFn: (formData: LoginPayload) => {
      return accountService.logIn(formData);
    },
    onSuccess: (response: LoginResponse) => {
      logIn(response);
    },
    onError: (error: CoreApiError) => {
      const errorResponse: CoreInputErrorResponse | undefined = error.coreError;

      if (error instanceof MethodArgumentNotValidError) {
        errorResponse?.errors.forEach((errorDetail: InputViolation) => {
          if (errorDetail.fieldName) {
            setError(errorDetail.fieldName as LoginSchemaKey, { message: errorDetail.errorMessage });
          }
        });
      }

      if (error instanceof UnauthorizedError) {
        setError('root', { message: errorResponse?.errors[0].errorMessage });
      }
    },
  });
};
