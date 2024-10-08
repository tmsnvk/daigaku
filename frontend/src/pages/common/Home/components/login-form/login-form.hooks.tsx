/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
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
import { UNEXPECTED_GLOBAL_ERROR, UNEXPECTED_SERVER_ERROR } from '@constants';

/* interface, type, enum imports */
import { MutationResult } from '@common-types';

/**
 * ===============
 * Custom Hook {@link useHandleLoginForm}
 * ===============
 */

/* interfaces, types, enums */
export interface LoginFormFields {
  readonly email: string;
  readonly password: string;
}

export interface LoginFormResponse {
  readonly email: string;
  readonly firstName: string;
  readonly jwtToken: string;
  readonly role: string;
}

interface HandleLoginFormParams {
  setError: UseFormSetError<LoginFormFields>;
}

type LoginFormErrorT = 'root';

export type HandleLoginForm = MutationResult<LoginFormResponse, AxiosError<LoginFormErrorT>, LoginFormFields>;

/**
 * @description
 * The custom hook manages the {@link LoginForm} submission process, including REST API request, error handling,
 * and post-success actions, such as setting account context and authentication status.
 *
 * @param {UseFormSetError<LoginFormFields>} params.setError
 * A `react-hook-form` function to set form errors.
 *
 * @returns {HandleLoginForm}
 * A `react-query` mutation object.
 *
 * @since 0.0.1
 */
export const useHandleLoginForm = ({ setError }: HandleLoginFormParams): HandleLoginForm => {
  const { setAccount, setAuthStatus, getAccountRole }: Partial<AuthContext> = useAuth();
  const navigate: NavigateFunction = useNavigate();

  return useMutation({
    mutationKey: [mutationKeys.account.POST_LOGIN_FORM],
    mutationFn: (formData: LoginFormFields) => accountService.logIn(formData),
    onSuccess: (response: LoginFormResponse) => {
      localStorage.setItem('auth-token', response.jwtToken);

      const account: Account = {
        ...response,
        role: getAccountRole(response.role),
      };

      setAccount(account);
      setAuthStatus(AuthStatus.SIGNED_IN);

      navigate('/dashboard');
    },
    onError: (error: AxiosError<LoginFormErrorT>) => {
      if (axios.isAxiosError(error)) {
        const status: number | undefined = error.response?.status;

        if (status) {
          if (status === 401) {
            setError('root', { message: error.response?.data });
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
