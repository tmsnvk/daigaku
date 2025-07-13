/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseMutationResult } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

/* logic imports */
import { CoreApiError } from '@daigaku/errors';
import { useCoreApiMutation } from '@daigaku/hooks';
import { useToastProvider } from '@daigaku/providers';
import { applicationStudentService } from '@daigaku/services';

/* configuration, constants imports */
import { mutationKeys } from '@daigaku/constants';

/**
 * Manages the user's .pdf download request.
 *
 * @returns {UseMutationResult<void, CoreApiError, void>}
 */
export const useRequestPdfDownload = (): UseMutationResult<void, CoreApiError, void> => {
  const { t } = useTranslation();

  const { createToast } = useToastProvider();

  return useCoreApiMutation(
    [mutationKeys.application.POST_REQUEST_PDF_DOWNLOAD],
    () => applicationStudentService.initiatePdfDownloadRequest(),
    {
      onSuccess: () => {
        createToast({
          title: t('success'),
          description: t('applicationPdfDownloadToast'),
          variantIntent: 'success',
        });
      },
      onError: () => {
        createToast({
          title: t('pdfRequestErrorTitle'),
          description: t('pdfRequestErrorDescription'),
          variantIntent: 'destructive',
          autoRemoveDelay: 10000,
        });
      },
    },
  );
};
