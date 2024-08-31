/**
 * @prettier
 */

/* external imports */
import { useMutation } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';

/* service imports */
import { pendingAccountService } from '@services/index';

/* configuration imports */
import { mutationKeys } from '@configuration';

/* interface, type, enum imports */
import { ConfirmationModal } from '../../hhome.types';
import { MutationResult } from '@common-types';

/* interfaces, types, enums */
export interface RegisterFormFields {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly institutionUuid: string;
  readonly accountRoleUuid: string;
}

type RegisterForm = {
  setError: UseFormSetError<RegisterFormFields>;
} & ConfirmationModal;

type RegisterFormErrorFields = `root.${string}` | 'root' | 'firstName' | 'lastName' | 'email' | 'institutionUuid' | 'accountRoleUuid';

interface RegisterFormError {
  response: {
    status: number;
    data: {
      [key: string]: RegisterFormErrorFields;
    };
  };
}

export type SubmitRegistrationForm = MutationResult<void, RegisterFormError, RegisterFormFields>;

/*
 * custom hook - TODO - add functionality description
 */
export const useSubmitRegistrationForm = ({ setError, showModal }: RegisterForm): SubmitRegistrationForm => {
  return useMutation({
    mutationKey: [mutationKeys.ACCOUNT.POST_REGISTER],
    mutationFn: (data: RegisterFormFields) => pendingAccountService.register(data),
    onSuccess: () => {
      showModal();
    },
    onError: (error: RegisterFormError) => {
      for (const fieldId in error.response.data) {
        if (error.response.data[fieldId]) {
          setError(fieldId as RegisterFormErrorFields, { message: error.response.data[fieldId] });
        }
      }

      if (error.response.data.root) {
        setError('root.serverError', { message: error.response.data.root });
      }
    },
  });
};
