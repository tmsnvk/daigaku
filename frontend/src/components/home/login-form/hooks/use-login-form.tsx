/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseMutationResult } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';

/* logic imports */
import { CoreApiError } from '@daigaku/errors';
import { useCoreApiMutation } from '@daigaku/hooks';
import { useAuthenticationProvider } from '@daigaku/providers';
import { accountService } from '@daigaku/services';
import { apiClient } from '@daigaku/utilities';

/* configuration, constants imports */
import { mutationKeys } from '@daigaku/constants';

/* interface, type imports */
import { LoginPayload, LoginResponse } from '@daigaku/common-types';

/**
 * Manages the login form submission.
 *
 * @param setError The `react-hook-form` method to set form errors.
 * @return {UseMutationResult<LoginResponse, CoreApiError, LoginPayload>}
 */
export const useLoginForm = (
  setError: UseFormSetError<LoginPayload>,
): UseMutationResult<LoginResponse, CoreApiError, LoginPayload> => {
  const { logIn } = useAuthenticationProvider();

  return useCoreApiMutation(
    [mutationKeys.account.POST_LOGIN_FORM],
    (formData: LoginPayload) => accountService.logIn(formData),
    {
      onSuccess: (response: LoginResponse) => {
        logIn(response);
      },
      onError: (error: CoreApiError) => {
        apiClient.errorWrapper(error, setError);
      },
    },
  );
};
