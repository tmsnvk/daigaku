/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { UseFormSetError } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

/* logic imports */
import { applicationStudentService } from '@daigaku/services';

/* configuration, utilities, constants imports */
import { mutationKeys, queryClient, queryKeys } from '@daigaku/configuration';

/* interface, type, enum imports */
import {
  ApplicationRecord,
  CoreErrorResponse,
  ErrorDetail,
  UpdateApplicationRecordByStudentPayload,
} from '@daigaku/common-types';
import { useToastContext } from '@daigaku/context';

/**
 * Defines the possible error field names in the {@link useUpdateApplicationFormMutation} custom hook.
 */
type UpdateApplicationFormErrorT =
  | 'root'
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
 * @return {UseMutationResult<ApplicationRecord, AxiosError<CoreErrorResponse>,
 *   UpdateApplicationRecordByStudentPayload>}
 */
export const useUpdateApplicationFormMutation = (
  setError: UseFormSetError<UpdateApplicationRecordByStudentPayload>,
  applicationUuid: string,
): UseMutationResult<ApplicationRecord, AxiosError<CoreErrorResponse>, UpdateApplicationRecordByStudentPayload> => {
  const { t } = useTranslation();

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
    onError: (error: AxiosError<CoreErrorResponse>) => {
      if (axios.isAxiosError(error)) {
        const status: number | undefined = error.response?.data.errorCode;
        const errors: CoreErrorResponse | undefined = error.response?.data;

        if (status) {
          if (status === 400 && errors) {
            if (errors) {
              errors.errors.forEach((error: ErrorDetail) => {
                if (error.fieldName) {
                  setError(error.fieldName as UpdateApplicationFormErrorT, { message: error.errorMessage });
                }
              });
            }
          } else if (status >= 500) {
            setError('root', { message: t('unexpectedServerError') });
          }
        }
      } else {
        setError('root', { message: t('unexpectedGlobalError') });
      }
    },
  });
};
