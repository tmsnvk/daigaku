import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import {
  SubmitHandler,
  UseFormSetError,
} from 'react-hook-form';
import {
  AccountDataT,
  AuthStatusE,
  useAuth,
} from '@context/AuthContext.tsx';
import { axiosConfig } from '@configuration';
import {
  LoginFormErrorT,
  LoginFormFieldsT,
  LoginFormReturnDataT,
} from './LoginForm.types.ts';
import { getAuthAccountRole } from '@utilities';

type LoginFormT = {
  setError: UseFormSetError<LoginFormFieldsT>;
}

const useSubmitLoginForm = ({ setError }: LoginFormT) => {
  const { setAccount, setAuthStatus } = useAuth();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationKey: ['userLoginForm'],
    mutationFn: async (data: LoginFormFieldsT): Promise<LoginFormReturnDataT> => {
      const response = await axiosConfig.request({
        method: 'POST',
        url: '/api/users/login',
        data,
      });

      return response.data;
    },
    onSuccess: (data: LoginFormReturnDataT) => {
      localStorage.setItem('token', data.jwtResponse.jwt);

      const userData: AccountDataT = {
        ...data.accountDataDto,
        accountRole: getAuthAccountRole(data.jwtResponse.roles[0]),
      };

      setAccount(userData);
      setAuthStatus(AuthStatusE.SignedIn);

      navigate('/dashboard');
    },
    onError: (error: LoginFormErrorT) => {
      setError('root.serverError', {
        type: error.response.status,
        message: error.response.data.message ? error.response.data.message : 'An unexpected error has happened. Please try again later.',
      });
    },
  });

  const onSubmit: SubmitHandler<LoginFormFieldsT> = (formData: LoginFormFieldsT) => {
    mutate(formData);
  };

  return {
    isPending,
    onSubmit,
  };
};

export {
  useSubmitLoginForm,
};
