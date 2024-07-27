import { useMutation } from '@tanstack/react-query';

import { applicationService } from '@services/index.ts';

import { mutationKeys } from '@configuration';

const useSendDownloadRequest = () => {
  return useMutation({
    mutationKey: [mutationKeys.APPLICATION.POST_PDF_REQUEST],
    mutationFn: () => applicationService.getDownloadRequest(),
    onSuccess: () => {
      // modal pop-up to confirm an email will arrive soon
    },
    onError: () => {
      // show error component
    },
  });
};

export {
  useSendDownloadRequest,
};
