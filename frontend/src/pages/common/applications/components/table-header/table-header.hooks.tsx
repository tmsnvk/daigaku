/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { useMutation } from '@tanstack/react-query';

/* logic imports */
import { applicationStudentService } from '@services';

/* configuration, utilities, constants imports */
import { mutationKeys } from '@configuration';

/* interface, type, enum imports */
import { RequestPdfDownload } from './table-header.models';

/**
 * Manages the user's .pdf download request.
 *
 * @returns {RequestPdfDownload}
 */
export const useRequestPdfDownload = (): RequestPdfDownload => {
  return useMutation({
    mutationKey: [mutationKeys.application.POST_REQUEST_PDF_DOWNLOAD],
    mutationFn: () => applicationStudentService.requestPdfDownload(),
  });
};
