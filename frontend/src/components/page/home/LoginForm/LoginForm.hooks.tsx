import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import {
  AccountDataT,
  AuthStatusE,
  useAuth,
} from '@context/AuthContext.tsx';
import {
  MUTATION_KEYS,
  axiosConfig,
} from '@configuration';

export type LoginFormFieldsT = {
  email: string;
  password: string;
}

type LoginFormT = {
  setError: UseFormSetError<LoginFormFieldsT>;
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
    mutationKey: [MUTATION_KEYS.ACCOUNT.POST_LOGIN_FORM],
    mutationFn: async (data: LoginFormFieldsT): Promise<LoginFormReturnDataT> => {
      const response = await axiosConfig.request({
        method: 'POST',
        url: '/api/accounts/login',
        data,
      });

      return response.data;
    },
    onSuccess: (data: LoginFormReturnDataT) => {
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
