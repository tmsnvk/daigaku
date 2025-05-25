/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

/* logic imports */
import { useAuthContext } from '@daigaku/context';
import { CoreApiError, FormValidationError, UnauthorizedError } from '@daigaku/errors';
import { accountService } from '@daigaku/services';

/* configuration, utilities, constants imports */
import { mutationKeys } from '@daigaku/configuration';
import { localStorageKeys } from '@daigaku/constants';
import { setLocalStorageObjectById } from '@daigaku/utilities';

/* interface, type, enum, schema imports */
import { ErrorDetail, LoginPayload, LoginResponse } from '@daigaku/common-types';

/**
 * Defines the {@link useLoginFormMutation} custom hook's error types.
 */
type LoginFormErrorField = 'root' | 'email' | 'password';

/**
 * Manages the login form submission.
 *
 * @param setError The `react-hook-form` method to set form errors.
 * @return {UseMutationResult<LoginResponse, CoreApiError, LoginPayload>}
 */
export const useLoginFormMutation = (
  setError: UseFormSetError<LoginPayload>,
): UseMutationResult<LoginResponse, CoreApiError, LoginPayload> => {
  const navigate = useNavigate();

  const { updateAccountContextDetails } = useAuthContext();

  return useMutation({
    mutationKey: [mutationKeys.account.POST_LOGIN_FORM],
    mutationFn: (formData: LoginPayload) => accountService.logIn(formData),
    onSuccess: (response: LoginResponse) => {
      setLocalStorageObjectById(localStorageKeys.AUTHENTICATION_TOKEN, response.jwtToken);
      updateAccountContextDetails(response);

      navigate('/dashboard');
    },
    onError: (error: CoreApiError) => {
      const coreErrorResponse = error.coreError;

      if (error instanceof FormValidationError) {
        coreErrorResponse?.errors.forEach((errorDetail: ErrorDetail) => {
          if (errorDetail.fieldName) {
            setError(errorDetail.fieldName as LoginFormErrorField, { message: errorDetail.errorMessage });
          }
        });
      }

      if (error instanceof UnauthorizedError) {
        setError('root', { message: coreErrorResponse?.errors[0].errorMessage });
      }
    },
  });
};
