/**
 * @prettier
 */

/* logic imports */
import { UpdatePagination, useGetCommentsByApplication, useUpdatePagination } from './comment-section.hooks';

/* component, style imports */
import { CommentSectionLoader } from '../comment-section-loader/index';
import { Comments } from '../comments/index';
import { CommentPaginationButton } from '../comment-pagination-button/index';
import { NewCommentBox } from '../new-comment-box/index';
import { Section } from './comment-section.styles';

/* interface, type, enum imports */
import { CommentMeta } from '@services/comment/comment.service';
import { SimpleQueryResult } from '@common-types';

/* interfaces, types, enums */
interface ComponentProps {
  readonly applicationUuid: string;
}

/*
 * component - TODO - add functionality description
 */
export const CommentSection = ({ applicationUuid }: ComponentProps) => {
  const { currentPage, updatePreviousButton, updateNextButton }: UpdatePagination = useUpdatePagination();
  const { data, isLoading, isError }: SimpleQueryResult<CommentMeta> = useGetCommentsByApplication(applicationUuid, currentPage);

  return (
    <>
      {isLoading ? (
        <CommentSectionLoader />
      ) : (
        <Section>
          <Comments
            comments={data?.comments ?? []}
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
              isDisabled={currentPage + 1 === data?.totalPages || (currentPage === 0 && data?.totalComments === 0)}
              content={'Next'}
            />
          </div>
          <NewCommentBox applicationUuid={applicationUuid} />
        </Section>
      )}
    </>
  );
};
