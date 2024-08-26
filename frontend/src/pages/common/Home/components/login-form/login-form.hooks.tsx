/**
 * @prettier
 */

import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';

import { AccountData, AuthContext, AuthStatus, useAuth } from '@context/auth';

import { accountService } from '@services/index';

import { mutationKeys } from '@configuration';
import { MutationResult } from '@common-types';

export interface LoginFormFields {
  readonly email: string;
  readonly password: string;
}

export interface LoginFormReturnData {
  readonly email: string;
  readonly firstName: string;
  readonly jwtToken: string;
  readonly role: string;
}

interface LoginForm {
  setError: UseFormSetError<LoginFormFields>;
}

type LoginFormErrorFieldsT = `root.${string}` | 'root' | 'email' | 'password';

interface LoginFormError {
  response: {
    status: number;
    data: {
      [key: string]: LoginFormErrorFieldsT;
    };
  };
}

export type SubmitLoginForm = MutationResult<LoginFormReturnData, LoginFormError, LoginFormFields>;

export const useSubmitLoginForm = ({ setError }: LoginForm): SubmitLoginForm => {
  const { setAccount, setAuthStatus, getAccountRole }: Partial<AuthContext> = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: [mutationKeys.ACCOUNT.POST_LOGIN],
    mutationFn: (data: LoginFormFields) => accountService.login(data),
    onSuccess: (data: LoginFormReturnData) => {
      localStorage.setItem('token', data.jwtToken);

      const userData: AccountData = {
        ...data,
        role: getAccountRole(data.role),
      };

      setAccount(userData);
      setAuthStatus(AuthStatus.SIGNED_IN);

      navigate('/dashboard');
    },
    onError: (error: LoginFormError) => {
      for (const fieldId in error.response.data) {
        if (error.response.data[fieldId]) {
          setError(fieldId as LoginFormErrorFieldsT, { message: error.response.data[fieldId] });
        }
      }

      if (error.response.data.root) {
        setError('root.serverError', { message: error.response.data.root });
      }
    },
  });
};
