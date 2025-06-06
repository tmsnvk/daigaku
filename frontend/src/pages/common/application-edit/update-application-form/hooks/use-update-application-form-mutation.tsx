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
import { useToastContext } from '@daigaku/context';
import { FormValidationError, ServerError, UnauthorizedError, UnexpectedError } from '@daigaku/errors';
import { applicationStudentService } from '@daigaku/services';

/* configuration, utilities, constants imports */
import { mutationKeys, queryKeys } from '@daigaku/constants';

/* interface, type, enum, schema imports */
import { Application, InputViolation, UpdateApplicationByStudentPayload } from '@daigaku/common-types';

/**
 * Defines the possible error field names in the {@link useUpdateApplicationFormMutation} custom hook.
 */
type UpdateApplicationFormField =
  | 'applicationStatusUuid'
  | 'interviewStatusUuid'
  | 'offerStatusUuid'
  | 'responseStatusUuid'
  | 'finalDestinationStatusUuid';

/**
 * Manages the {@link ApplicationForm} submission process, including REST API request, error handling,
 * and post-success actions, such as setting account context and authentication status.
 *
 * @param setError `react-hook-form`'s error setting method.
 * @param applicationUuid The application's uuid string.
 * @return {UseMutationResult<Application, UnauthorizedError | FormValidationError | ServerError |
 *   UnexpectedError, UpdateApplicationByStudentPayload>}
 */
export const useUpdateApplicationFormMutation = (
  setError: UseFormSetError<UpdateApplicationByStudentPayload>,
  applicationUuid: string,
): UseMutationResult<
  Application,
  UnauthorizedError | FormValidationError | ServerError | UnexpectedError,
  UpdateApplicationByStudentPayload
> => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { createToast } = useToastContext();

  return useMutation({
    mutationKey: [mutationKeys.application.PATCH_BY_UUID],
    mutationFn: (formData: UpdateApplicationByStudentPayload) =>
      // TODO: if undefined/null field values are a problem, do something with them here
      applicationStudentService.updateByUuid(formData, applicationUuid),
    onSuccess: (response: Application) => {
      queryClient.setQueryData<Array<Application>>([queryKeys.application.GET_ALL_BY_ROLE], (applications) => {
        if (!applications) {
          return;
        }

        const filteredList: Array<Application> = applications.filter(
          (application: Application) => application.uuid !== response.uuid,
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
    onError: (error: UnauthorizedError | FormValidationError | ServerError | UnexpectedError) => {
      if (error instanceof FormValidationError) {
        error.coreError?.errors.forEach((errorDetail: InputViolation) => {
          if (errorDetail.fieldName) {
            setError(errorDetail.fieldName as UpdateApplicationFormField, { message: errorDetail.message });
          }
        });
      }
    },
  });
};
