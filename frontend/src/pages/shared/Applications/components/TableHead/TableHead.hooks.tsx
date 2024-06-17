import { useQuery } from '@tanstack/react-query';
import { applicationService } from '@services/index.ts';
import { queryKeys } from '@configuration';
import { useState } from 'react';

const useSendDownloadRequest = () => {
  const [isRequestSent, setIsRequestSent] = useState<boolean>(false);

  const sendDownloadRequest = () => {
    setIsRequestSent(!isRequestSent);
  };

  const query = useQuery({
    queryKey: [queryKeys.APPLICATION.POST_DOWNLOAD_REQUEST],
    queryFn: () => applicationService.getDownloadRequest(),
    enabled: isRequestSent,
  });

  return {
    sendDownloadRequest,
    isError: query.isError,
  };
};

export {
  useSendDownloadRequest,
};
