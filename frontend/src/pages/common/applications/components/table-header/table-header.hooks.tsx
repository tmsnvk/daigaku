/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* external imports */
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

/* logic imports */
import { applicationStudentService } from '@services/index';

/* configuration, utilities, constants imports */
import { mutationKeys } from '@configuration';

/* interface, type, enum imports */
import { MutationResult } from '@common-types';

/**
 * ===============
 * Custom Hook {@link useRequestPdfDownload}
 * ===============
 */

/**
 * Defines the possible error types of the {@link useRequestPdfDownload} custom hook.
 *
 * @since 0.0.1
 */
type SendDownloadRequestErrorT = 'root';

/**
 * Defines the return value properties of the {@link useRequestPdfDownload} custom hook.
 * A `react-query` mutation object.
 *
 * @since 0.0.1
 */
export type RequestPdfDownload = MutationResult<void, AxiosError<SendDownloadRequestErrorT>, void>;

/**
 * Manages the user's .pdf download request.
 *
 * @returns {RequestPdfDownload}
 *
 * @since 0.0.1
 */
export const useRequestPdfDownload = (): RequestPdfDownload => {
  return useMutation({
    mutationKey: [mutationKeys.application.POST_REQUEST_PDF_DOWNLOAD],
    mutationFn: () => applicationStudentService.requestPdfDownload(),
  });
};
