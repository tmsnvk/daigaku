import { AxiosError } from 'axios';
import {
  useGetCommentsByApplication,
  useUpdatePagination,
} from './CommentSection.hooks.tsx';
import { GlobalErrorModal } from '@components/notification';
import Comments from '../Comments';
import NewCommentBox from '../NewCommentBox';
import CommentSectionLoader from '../CommentSectionLoader';
import { Section } from './CommentSection.styles.ts';

type ComponentPropsT = {
  applicationUuid: string;
}

const CommentSection = ({ applicationUuid }: ComponentPropsT) => {
  const { currentPage, updatePreviousButton, updateNextButton } = useUpdatePagination();
  const { data, isLoading, isError, error } = useGetCommentsByApplication(applicationUuid, currentPage);

  if (isError && error instanceof AxiosError) {
    return <GlobalErrorModal error={error.response?.data.root} />;
  }

  return (
    isLoading ?
      <CommentSectionLoader /> :
      <Section>
        <Comments
          data={data?.comments ?? []}
        />
        <div>
          <button onClick={updatePreviousButton}>Previous</button>
          <span>Page {currentPage + 1}</span>
          <button onClick={() => updateNextButton(data?.totalPages as number)}>Next</button>
        </div>
        <NewCommentBox
          applicationUuid={applicationUuid}
        />
      </Section>
  );
};

export default CommentSection;
