/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';

/* logic imports */
import { applicationStudentService } from '@daigaku/services';
import { useToastContext } from '@daigaku/context';

/* configuration, utilities, constants imports */
import { mutationKeys } from '@daigaku/configuration';

/**
 * Defines the possible error types of the {@link useRequestPdfDownload} custom hook.
 */
type SendDownloadRequestErrorT = 'root';

/**
 * Manages the user's .pdf download request.
 *
 * @returns {UseMutationResult<void, AxiosError<SendDownloadRequestErrorT>, void>}
 */
export const useRequestPdfDownload = (): UseMutationResult<void, AxiosError<SendDownloadRequestErrorT>, void> => {
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
