/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

/* logic imports */
import { useToastContext } from '@daigaku/context';
import { applicationStudentService } from '@daigaku/services';
import { FormValidationError, ServerError, UnauthorizedError, UnexpectedError } from '@daigaku/errors';

/* configuration, utilities, constants imports */
import { mutationKeys } from '@daigaku/configuration';

/**
 * Manages the user's .pdf download request.
 *
 * @returns {UseMutationResult<void, FormValidationError | UnauthorizedError | ServerError | UnexpectedError, void>}
 */
export const useRequestPdfDownload = (): UseMutationResult<
  void,
  FormValidationError | UnauthorizedError | ServerError | UnexpectedError,
  void
> => {
  const { t } = useTranslation();
  const { createToast } = useToastContext();

  return useMutation({
    mutationKey: [mutationKeys.application.POST_REQUEST_PDF_DOWNLOAD],
    mutationFn: () => applicationStudentService.requestPdfDownload(),
    onSuccess: () => {
      createToast({
        title: t('success'),
        description: t('applicationPdfDownloadToast'),
        variantIntent: 'success',
      });
    },
  });
};
