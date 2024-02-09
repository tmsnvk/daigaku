import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, UseFormSetError, } from 'react-hook-form';
import {
  AuthStatus,
  useAuth,
} from '@context/AuthContext.tsx';
import { axiosConfig } from '@configuration';
import {
  LoginFormErrorT,
  LoginFormFieldsT,
  LoginFormReturnDataT,
} from './LoginForm.types.ts';

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
      setAccount(data.accountDataDto);
      setAuthStatus(AuthStatus.SignedIn);

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
