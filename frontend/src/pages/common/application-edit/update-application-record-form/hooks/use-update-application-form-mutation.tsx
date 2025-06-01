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
import { mutationKeys, queryKeys } from '@daigaku/configuration';

/* interface, type, enum, schema imports */
import { ApplicationRecord, InputViolation, UpdateApplicationRecordByStudentPayload } from '@daigaku/common-types';

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
 * @return {UseMutationResult<ApplicationRecord, UnauthorizedError | FormValidationError | ServerError |
 *   UnexpectedError, UpdateApplicationRecordByStudentPayload>}
 */
export const useUpdateApplicationFormMutation = (
  setError: UseFormSetError<UpdateApplicationRecordByStudentPayload>,
  applicationUuid: string,
): UseMutationResult<
  ApplicationRecord,
  UnauthorizedError | FormValidationError | ServerError | UnexpectedError,
  UpdateApplicationRecordByStudentPayload
> => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { createToast } = useToastContext();

  return useMutation({
    mutationKey: [mutationKeys.application.PATCH_BY_UUID],
    mutationFn: (formData: UpdateApplicationRecordByStudentPayload) =>
      applicationStudentService.patchByUuid(formData, applicationUuid),
    onSuccess: (response: ApplicationRecord) => {
      queryClient.setQueryData<Array<ApplicationRecord>>([queryKeys.application.GET_ALL_BY_ROLE], (applications) => {
        if (!applications) {
          return;
        }

        const filteredList: Array<ApplicationRecord> = applications.filter(
          (application: ApplicationRecord) => application.uuid !== response.uuid,
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
