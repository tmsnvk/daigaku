/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { UseFormSetError } from 'react-hook-form';
import { NavigateFunction, useNavigate } from 'react-router-dom';

/* logic imports */
import { Account, AuthContext, AuthStatus, useAuth } from '@context/auth';
import { accountService } from '@services';

/* configuration, utilities, constants imports */
import { mutationKeys } from '@configuration';
import { UNEXPECTED_GLOBAL_ERROR, UNEXPECTED_SERVER_ERROR, localStorageKeys } from '@constants';

/* interface, type, enum imports */
import { CoreErrorResponse, LoginRequest, LoginResponse } from '@common-types';
import { HandleLoginForm } from './login-form.models';

/**
 * Manages the {@link LoginForm} submission process, including REST API request, error handling,
 * and post-success actions, such as setting account context and authentication status.
 *
 * @param setError A `react-hook-form` function to set form errors.
 * @return {HandleLoginForm}
 */
export const useHandleLoginForm = (setError: UseFormSetError<LoginRequest>): HandleLoginForm => {
  const navigate: NavigateFunction = useNavigate();
  const { setAccount, setAuthStatus, getAccountRole }: Partial<AuthContext> = useAuth();

  return useMutation({
    mutationKey: [mutationKeys.account.POST_LOGIN_FORM],
    mutationFn: (formData: LoginRequest) => accountService.logIn(formData),
    onSuccess: (response: LoginResponse) => {
      localStorage.setItem(localStorageKeys.AUTHENTICATION_TOKEN, response.jwtToken);

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
