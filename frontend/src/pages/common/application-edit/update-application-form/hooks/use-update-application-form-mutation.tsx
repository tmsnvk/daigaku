/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

/* logic imports */
import {
  ConstraintViolationError,
  CoreApiError,
  FormValidationError,
  MethodArgumentNotValidError,
} from '@daigaku/errors';
import { useToastProvider } from '@daigaku/providers';
import { applicationStudentService } from '@daigaku/services';
import { UpdateApplicationSchemaFieldKey } from '../schema.ts';

/* configuration, constants imports */
import { mutationKeys, queryKeys } from '@daigaku/constants';

/* interface, type imports */
import {
  ApplicationResponse,
  CoreInputErrorResponse,
  InputViolation,
  UpdateApplicationByStudentPayload,
} from '@daigaku/common-types';

/**
 * Manages the {@link ApplicationForm} submission process, including REST API request, error handling,
 * and post-success actions, such as setting account context and authentication status.
 *
 * @param setError `react-hook-form`'s error setting method.
 * @param applicationUuid The application's uuid string.
 * @return {UseMutationResult<ApplicationResponse, CoreApiError, UpdateApplicationByStudentPayload>}
 */
export const useUpdateApplicationFormMutation = (
  setError: UseFormSetError<UpdateApplicationByStudentPayload>,
  applicationUuid: string,
): UseMutationResult<ApplicationResponse, CoreApiError, UpdateApplicationByStudentPayload> => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { createToast } = useToastProvider();

  return useMutation({
    mutationKey: [mutationKeys.application.PATCH_BY_UUID],
    mutationFn: (formData: UpdateApplicationByStudentPayload) => {
      return applicationStudentService.updateByUuid(formData, applicationUuid);
    },
    onSuccess: (response: ApplicationResponse) => {
      queryClient.setQueryData<Array<ApplicationResponse>>([queryKeys.application.GET_ALL_BY_ROLE], (applications) => {
        if (!applications) {
          return;
        }

        const filteredList: Array<ApplicationResponse> = applications.filter(
          (application: ApplicationResponse) => application.uuid !== response.uuid,
        );

        return [...filteredList, response];
      });

      history.replaceState(response, '', `/applications/edit/${response.uuid}`);

      createToast({
        title: t('genericSuccessToastTitle'),
        description: t('applicationUpdated'),
        variantIntent: 'success',
      });
    },
    onError: (error: CoreApiError) => {
      const errorResponse: CoreInputErrorResponse | undefined = error.coreError;

      if (error instanceof MethodArgumentNotValidError || error instanceof ConstraintViolationError) {
        errorResponse?.errors.forEach((errorDetail: InputViolation) => {
          if (errorDetail.fieldName) {
            setError(errorDetail.fieldName as UpdateApplicationSchemaFieldKey, { message: errorDetail.errorMessage });
          }
        });
      }

      if (error instanceof FormValidationError) {
        setError('root', { message: errorResponse?.errors[0].errorMessage });
      }
    },
  });
};
