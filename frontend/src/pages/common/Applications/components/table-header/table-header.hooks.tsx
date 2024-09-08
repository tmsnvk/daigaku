/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
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

/* interfaces, types, enums */
type SendDownloadRequestErrorT = 'root';

export type RequestPdfDownload = MutationResult<void, AxiosError<SendDownloadRequestErrorT>, void>;

/*
 * custom hook - TODO - add functionality description
 */
export const useRequestPdfDownload = (): RequestPdfDownload => {
  return useMutation({
    mutationKey: [mutationKeys.application.POST_REQUEST_PDF_DOWNLOAD],
    mutationFn: () => applicationStudentService.requestPdfDownload(),
    onSuccess: () => {
      // TODO - modal pop-up to confirm an email will arrive soon
      // confirmation modal, pass in the showModal() method same as in reset-form
    },
    onError: (error: AxiosError<SendDownloadRequestErrorT>) => {},
  });
};
