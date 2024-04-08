import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import { AxiosResponse } from 'axios';
import {
  AccountDataT,
  AuthStatusE,
  useAuth,
} from '@context/AuthContext.tsx';
import { accountService } from '@services/index.ts';
import { mutationKeys } from '@configuration';

export type LoginFormFieldsT = {
  email: string;
  password: string;
}

export type LoginFormReturnDataT = {
  email: string;
  firstName: string;
  lastName: string;
  registeredAt: string;
  lastUpdatedAt: string;
  jwtToken: string;
  role: string;
}

type LoginFormT = {
  setError: UseFormSetError<LoginFormFieldsT>;
}

type LoginFormErrorFieldsT = `root.${string}` | 'root' | 'email' | 'password';

type LoginFormErrorT = {
  response: {
    status: number;
    data: {
      [key: string]: LoginFormErrorFieldsT;
    }
  }
}

const useSubmitLoginForm = ({ setError }: LoginFormT) => {
  const { setAccount, setAuthStatus, getAccountRole } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: [mutationKeys.ACCOUNT.POST_LOGIN_FORM],
    mutationFn: (data: LoginFormFieldsT) => accountService.login(data),
    onSuccess: ({ data }: AxiosResponse<LoginFormReturnDataT>) => {
      localStorage.setItem('token', data.jwtToken);

      const userData: AccountDataT = {
        ...data,
        role: getAccountRole(data.role),
      };

      setAccount(userData);
      setAuthStatus(AuthStatusE.SIGNED_IN);

      navigate('/dashboard');
    },
    onError: (error: LoginFormErrorT) => {
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

export {
  useSubmitLoginForm,
};
