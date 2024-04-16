import { useMutation, useQuery } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import { accountService, countryService } from '@services/index.ts';
import { mutationKeys, queryKeys } from '@configuration';
import { ConfirmationModalT } from '@pages/shared/Home/Home.types.ts';

const useGetSchoolOptions = () => {
  return useQuery({
    queryKey: [queryKeys.INSTITUTIONS.GET_ALL],
    queryFn: () => countryService.getAllOptions(),
  });
};

export type RegisterFormFieldsT = {
  firstName: string;
  lastName: string;
  email: string;
}

type RegisterFormT = {
  setError: UseFormSetError<RegisterFormFieldsT>;
} & ConfirmationModalT;

type RegisterFormErrorFieldsT = `root.${string}` | 'root' | 'firstName' | 'lastName' | 'email';

type RegisterFormErrorT = {
  response: {
    status: number;
    data: {
      [key: string]: RegisterFormErrorFieldsT;
    }
  }
}

const useSubmitRegisterForm = ({ setError, showModal }: RegisterFormT) => {
  return useMutation({
    mutationKey: [mutationKeys.ACCOUNT.POST_REGISTER_FORM],
    mutationFn: (data: RegisterFormFieldsT) => accountService.register(data),
    onSuccess: () => {
      showModal();
    },
    onError: (error: RegisterFormErrorT) => {
      for (const fieldId in error.response.data) {
        if (error.response.data[fieldId]) {
          setError(fieldId as RegisterFormErrorFieldsT, { message: error.response.data[fieldId] });
        }
      }

      if (error.response.data.root) {
        setError('root.serverError', { message: error.response.data.root });
      }
    },
  });
};

export {
  useGetSchoolOptions,
  useSubmitRegisterForm,
};
