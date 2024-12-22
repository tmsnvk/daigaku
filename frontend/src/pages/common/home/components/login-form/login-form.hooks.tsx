/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* external imports */
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { UseFormSetError } from 'react-hook-form';
import { NavigateFunction, useNavigate } from 'react-router-dom';

/* logic imports */
import { Account, AuthContext, AuthStatus, useAuth } from '@context/auth';
import { accountService } from '@services/index';

/* configuration, utilities, constants imports */
import { mutationKeys } from '@configuration';
import { localStorageKeyConstants, UNEXPECTED_GLOBAL_ERROR, UNEXPECTED_SERVER_ERROR } from '@constants';

/* interface, type, enum imports */
import { CoreErrorResponse, MutationResult } from '@common-types';

/**
 * ===============
 * Custom Hook {@link useHandleLoginForm}
 * ===============
 */

/**
 * Defines the properties of a single user login form submission.
 *
 * @since 0.0.1
 */
export interface LoginFormFields {
  readonly email: string;
  readonly password: string;
}

/**
 * Defines the properties of a successful login request.
 *
 * @since 0.0.1
 */
export interface LoginFormResponse {
  readonly email: string;
  readonly firstName: string;
  readonly jwtToken: string;
  readonly role: string;
}

/**
 * Defines the {@link useHandleLoginForm} custom hook's return value properties.
 *
 * @since 0.0.1
 */
export type HandleLoginForm = MutationResult<LoginFormResponse, AxiosError<CoreErrorResponse>, LoginFormFields>;

/**
 * Manages the {@link LoginForm} submission process, including REST API request, error handling,
 * and post-success actions, such as setting account context and authentication status.
 *
 * @param setError A `react-hook-form` function to set form errors.
 * @return {HandleLoginForm}
 *
 * @since 0.0.1
 */
export const useHandleLoginForm = (setError: UseFormSetError<LoginFormFields>): HandleLoginForm => {
  // `react-router-dom` navigate object.
  const navigate: NavigateFunction = useNavigate();

  // Authentication context.
  const { setAccount, setAuthStatus, getAccountRole }: Partial<AuthContext> = useAuth();

  return useMutation({
    mutationKey: [mutationKeys.account.POST_LOGIN_FORM],
    mutationFn: (formData: LoginFormFields) => accountService.logIn(formData),
    onSuccess: (response: LoginFormResponse) => {
      localStorage.setItem(localStorageKeyConstants.AUTH_TOKEN, response.jwtToken);

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
