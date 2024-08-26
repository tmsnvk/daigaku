/**
 * @prettier
 */

import { useMutation } from '@tanstack/react-query';

import { applicationStudentService } from '@services/application/application-student.service';

import { mutationKeys } from '@configuration';
import { MutationResult } from '@common-types';

type SendDownloadRequestErrorT = `root.${string}` | 'root';

interface SendDownloadRequestError {
  response: {
    status: number;
    data: {
      [key: string]: SendDownloadRequestErrorT;
    };
  };
}

export type SendDownloadRequest = MutationResult<void, SendDownloadRequestError, void>;

export const useSendDownloadRequest = (): SendDownloadRequest => {
  return useMutation({
    mutationKey: [mutationKeys.APPLICATION.POST_PDF_REQUEST],
    mutationFn: () => applicationStudentService.requestDownload(),
    onSuccess: () => {
      // modal pop-up to confirm an email will arrive soon
    },
    onError: () => {
      // show error component
    },
  });
};
