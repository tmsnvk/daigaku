import {
  useGetCommentsByApplication,
  useUpdatePagination,
} from './CommentSection.hooks.tsx';

import CommentSectionLoader from '../CommentSectionLoader';
import Comments from '../Comments';
import CommentPaginationButton from '../CommentPaginationButton';
import NewCommentBox from '../NewCommentBox';
import { Section } from './CommentSection.styles.ts';

type ComponentPropsT = {
  applicationUuid: string;
}

const CommentSection = ({ applicationUuid }: ComponentPropsT) => {
  const { currentPage, updatePreviousButton, updateNextButton } = useUpdatePagination();
  const { data, isLoading, isError } = useGetCommentsByApplication(applicationUuid, currentPage);

  return (
    <>
      {isLoading ?
        <CommentSectionLoader /> :
        <Section>
          <Comments
            data={data?.comments ?? []}
            isError={isError}
          />
          <div>
            <CommentPaginationButton
              onClick={updatePreviousButton}
              isDisabled={data?.currentPage === 0}
              content={'Previous'}
            />
            <span>Page {currentPage + 1}</span>
            <CommentPaginationButton
              onClick={() => updateNextButton(data?.totalPages as number)}
              isDisabled={(currentPage + 1 === data?.totalPages) || (currentPage === 0 && data?.totalComments === 0)}
              content={'Next'}
            />
          </div>
          <NewCommentBox
            applicationUuid={applicationUuid}
          />
        </Section>}

    </>
  );
};

export default CommentSection;
