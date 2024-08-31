/**
 * @prettier
 */

/* external imports */
import { useMutation } from '@tanstack/react-query';

/* service imports */
import { applicationStudentService } from '@services/application/application-student.service';

/* configuration imports */
import { mutationKeys } from '@configuration';

/* interface, type, enum imports */
import { MutationResult } from '@common-types';

/* interfaces, types, enums */
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

/*
 * custom hook - TODO - add functionality description
 */
export const useSendDownloadRequest = (): SendDownloadRequest => {
  return useMutation({
    mutationKey: [mutationKeys.APPLICATION.POST_PDF_REQUEST],
    mutationFn: () => applicationStudentService.requestDownload(),
    onSuccess: () => {
      // TODO - modal pop-up to confirm an email will arrive soon
    },
    onError: () => {
      // TODO - show error component
    },
  });
};
