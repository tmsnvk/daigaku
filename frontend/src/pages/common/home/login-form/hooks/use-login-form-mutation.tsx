/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { UseFormSetError } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

/* logic imports */
import { useAuthContext } from '@daigaku/context';
import { accountService } from '@daigaku/services';

/* configuration, utilities, constants imports */
import { mutationKeys } from '@daigaku/configuration';
import { localStorageKeys } from '@daigaku/constants';
import { setLocalStorageObjectById } from '@daigaku/utilities';

/* interface, type, enum, schema imports */
import { CoreErrorResponse, LoginPayload, LoginResponse } from '@daigaku/common-types';

/**
 * Manages the login form submission.
 *
 * @param setError The `react-hook-form` method to set form errors.
 * @return {UseMutationResult<LoginResponse, AxiosError<CoreErrorResponse>, LoginPayload>}
 */
export const useLoginFormMutation = (
  setError: UseFormSetError<LoginPayload>,
): UseMutationResult<LoginResponse, AxiosError<CoreErrorResponse>, LoginPayload> => {
  const { t } = useTranslation();

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
    onError: (error: AxiosError<CoreErrorResponse>) => {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        const status: number = error.response.data.errorCode;

        if (status === 401) {
          setError('root', { message: error.response.data.errors[0].errorMessage });
        } else if (status >= 500) {
          setError('root', { message: t('unexpectedServerError') });
        }
      } else {
        setError('root', { message: t('unexpectedServerError') });
      }
    },
  });
};
