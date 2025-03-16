/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

/* logic imports */
import { applicationStudentService } from '@services';

/* configuration, utilities, constants imports */
import { mutationKeys } from '@configuration';

/**
 * Defines the possible error types of the {@link useRequestPdfDownload} custom hook.
 */
type SendDownloadRequestErrorT = 'root';

/**
 * Manages the user's .pdf download request.
 *
 * @returns {UseMutationResult<void, AxiosError<SendDownloadRequestErrorT>, void>}
 */
export const useRequestPdfDownload = (
  onDownloadPdfRequest: () => void,
): UseMutationResult<void, AxiosError<SendDownloadRequestErrorT>, void> => {
  return useMutation({
    mutationKey: [mutationKeys.application.POST_REQUEST_PDF_DOWNLOAD],
    mutationFn: () => applicationStudentService.requestPdfDownload(),
    onSuccess: () => {
      onDownloadPdfRequest();
    },
  });
};
