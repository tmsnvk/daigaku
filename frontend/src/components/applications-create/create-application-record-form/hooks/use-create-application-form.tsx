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
import { ApplicationResponse, CreateApplicationByStudentPayload } from '@daigaku/common-types';

/**
 * Manages the submission of new application submission via the `react-query` package.
 *
 * @param setError A function to set validation errors for form fields.
 * @param resetCountrySelection A function to reset the country selection in the form.
 * @param reset A `react-hook-form` method to reset the entire form.
 * @return {UseMutationResult<ApplicationResponse, CoreApiError, CreateApplicationByStudentPayload>}
 */
export const useCreateApplicationForm = (
  setError: UseFormSetError<CreateApplicationByStudentPayload>,
  resetCountrySelection: () => void,
  reset: () => void,
): UseMutationResult<ApplicationResponse, CoreApiError, CreateApplicationByStudentPayload> => {
  const { t } = useTranslation();
  const queryClient = useCoreQueryClient();

  const { createToast } = useToastProvider();

  return useCoreApiMutation(
    [mutationKeys.application.POST_BY_STUDENT],
    (formData: CreateApplicationByStudentPayload) => applicationStudentService.create(formData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [queryKeys.application.GET_ALL_BY_ROLE] });

        resetCountrySelection();
        reset();

        createToast({
          title: t('genericSuccessToastTitle'),
          description: t('createApplicationFormSubmissionToastDescription'),
          variantIntent: 'success',
        });
      },
      onError: (error: CoreApiError) => {
        apiClient.errorWrapper(error, setError);
      },
    },
  );
};
