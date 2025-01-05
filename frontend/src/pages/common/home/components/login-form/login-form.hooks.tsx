/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { UseFormSetError } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

/* logic imports */
import { Account, AuthStatus, useAuthContext } from '@context/auth';
import { accountService } from '@services';

/* configuration, utilities, constants imports */
import { mutationKeys } from '@configuration';
import { UNEXPECTED_GLOBAL_ERROR, UNEXPECTED_SERVER_ERROR, localStorageKeys } from '@constants';
import { setLocalStorageObjectById } from '@utilities';

/* interface, type, enum imports */
import { CoreErrorResponse, LoginRequest, LoginResponse } from '@common-types';

/**
 * Manages the component's form submission.
 *
 * @param setError A `react-hook-form` function to set form errors.
 * @return {UseMutationResult<LoginResponse, AxiosError<CoreErrorResponse>, LoginRequest>}
 */
export const useHandleLoginForm = (
  setError: UseFormSetError<LoginRequest>,
): UseMutationResult<LoginResponse, AxiosError<CoreErrorResponse>, LoginRequest> => {
  const navigate = useNavigate();
  const { setAccount, setAuthStatus, getAccountRole } = useAuthContext();

  return useMutation({
    mutationKey: [mutationKeys.account.POST_LOGIN_FORM],
    mutationFn: (formData: LoginRequest) => accountService.logIn(formData),
    onSuccess: (response: LoginResponse) => {
      setLocalStorageObjectById(localStorageKeys.AUTHENTICATION_TOKEN, response.jwtToken);

      const account: Account = {
        ...response,
        role: getAccountRole(response.role),
      };

      setAccount(account);
      setAuthStatus(AuthStatus.SIGNED_IN);

      navigate('/dashboard');
    },
    onError: (error: AxiosError<CoreErrorResponse>) => {
      if (axios.isAxiosError(error)) {
        const status: number | undefined = error.response?.data.errorCode;

        if (status) {
          if (status === 401) {
            setError('root', { message: error.response?.data.errors[0].errorMessage });
          } else if (status >= 500) {
            setError('root', { message: UNEXPECTED_SERVER_ERROR });
          }
        }
      } else {
        setError('root', { message: UNEXPECTED_GLOBAL_ERROR });
      }
    },
  });
};
