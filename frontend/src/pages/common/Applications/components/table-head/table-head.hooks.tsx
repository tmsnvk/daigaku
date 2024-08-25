/**
 * @prettier
 */

import { useMutation } from '@tanstack/react-query';

import { applicationStudentService } from '@services/application/application-student.service';

import { mutationKeys } from '@configuration';

export const useSendDownloadRequest = () => {
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
