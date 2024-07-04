import { useMutation } from '@tanstack/react-query';
import { applicationService } from '@services/index.ts';
import { mutationKeys } from '@configuration';

const useSendDownloadRequest = () => {
  return useMutation({
    mutationKey: [mutationKeys.APPLICATION.POST_PDF_REQUEST],
    mutationFn: () => applicationService.getDownloadRequest(),
    onSuccess: () => {

    },
    onError: () => {

    },
  });
};

export {
  useSendDownloadRequest,
};
