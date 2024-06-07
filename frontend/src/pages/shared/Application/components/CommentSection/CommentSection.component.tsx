import { useState } from 'react';
import { AxiosError } from 'axios';
import { useGetCommentsByApplication } from './CommentSection.hooks.tsx';
import { GlobalErrorModal } from '@components/notification';
import Comments from '../Comments';
import NewCommentBox from '../NewCommentBox';
import CommentSectionLoader from '../CommentSectionLoader';
import { Section } from './CommentSection.styles.ts';

type ComponentPropsT = {
  applicationUuid: string;
}

const CommentSection = ({ applicationUuid }: ComponentPropsT) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, isLoading, isError, error } = useGetCommentsByApplication(applicationUuid, currentPage);

  if (isError && error instanceof AxiosError) {
    return <GlobalErrorModal error={error.response?.data.root} />;
  }

  return (
    isLoading ?
      <CommentSectionLoader /> :
      <Section>
        <Comments
          data={data ?? []}
        />

        <NewCommentBox
          applicationUuid={applicationUuid}
        />
      </Section>
  );
};

export default CommentSection;
