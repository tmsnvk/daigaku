/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseMutationResult } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

/* logic imports */
import { CoreApiError } from '@daigaku/errors';
import { useCoreApiMutation, useCoreQueryClient } from '@daigaku/hooks';
import { useToastProvider } from '@daigaku/providers';
import { applicationStudentService } from '@daigaku/services';
import { apiClient } from '@daigaku/utilities';

/* configuration, constants imports */
import { mutationKeys, queryKeys } from '@daigaku/constants';

/* interface, type imports */
import { ApplicationResponse, UpdateApplicationByStudentPayload } from '@daigaku/common-types';

/**
 * Manages the {@link ApplicationForm} submission process, including REST API request, error handling,
 * and post-success actions, such as setting account context and authentication status.
 *
 * @param setError `react-hook-form`'s error setting method.
 * @param applicationUuid The application's uuid string.
 * @return {UseMutationResult<ApplicationResponse, CoreApiError, UpdateApplicationByStudentPayload>}
 */
export const useUpdateApplicationForm = (
  setError: UseFormSetError<UpdateApplicationByStudentPayload>,
  applicationUuid: string,
): UseMutationResult<ApplicationResponse, CoreApiError, UpdateApplicationByStudentPayload> => {
  const { t } = useTranslation();
  const queryClient = useCoreQueryClient();

  const { createToast } = useToastProvider();

  return useCoreApiMutation(
    [mutationKeys.application.PATCH_BY_UUID],
    (formData: UpdateApplicationByStudentPayload) => applicationStudentService.updateByUuid(formData, applicationUuid),
    {
      onSuccess: (response: ApplicationResponse) => {
        queryClient.invalidateQueries({ queryKey: [queryKeys.application.GET_ALL_BY_ROLE] });

        history.replaceState(response, '', `/applications/${response.uuid}/student/edit`);

        createToast({
          title: t('genericSuccessToastTitle'),
          description: t('applicationUpdated'),
          variantIntent: 'success',
        });
      },
      onError: (error: CoreApiError) => {
        apiClient.errorWrapper(error, setError);
      },
    },
  );
};
