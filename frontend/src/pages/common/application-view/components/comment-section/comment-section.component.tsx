/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* logic imports */
import { useGetCommentsByApplicationAndPagination, useHandleCommentPagination } from './comment-section.hooks';

/* component, style imports */
import { LoadingIndicator } from '@components/general';
import { CommentPaginationButton } from '../comment-pagination-button';
import { Comments } from '../comments';
import { CreateCommentForm } from '../create-comment-form';
import { Section } from './comment-section.styles';

/* configuration, utilities, constants imports */
import { constants } from './comment-section.constants';

/* interface, type, enum imports */
import { CommentPaginationData, SimpleQueryResult } from '@common-types';
import { CommentPagination } from './comment-section.models';

/**
 * Defines the component's properties.
 */
interface ComponentProps {
  /**
   * The application's uuid is used in the REST API request when the user submits a new comment.
   */
  readonly applicationUuid: string;
}

/**
 * Renders the comment section in an application's {@link ApplicationView} page.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element}
 */
export const CommentSection = ({ applicationUuid }: ComponentProps): JSX.Element => {
  const { currentPage, goToPreviousPage, goToNextPage }: CommentPagination = useHandleCommentPagination();
  const { data, isLoading, isError }: SimpleQueryResult<CommentPaginationData> = useGetCommentsByApplicationAndPagination(
    applicationUuid,
    currentPage,
  );

  if (isLoading) {
    return <LoadingIndicator loadingText={constants.ui.LOADING} />;
  }

  return (
    <>
      <Section>
        <Comments
          comments={data?.comments ?? []}
          isError={isError}
        />
        <div>
          <CommentPaginationButton
            onClick={goToPreviousPage}
            isDisabled={data?.currentPage === 0}
            value={constants.ui.pagination.PREVIOUS}
          />
          <span>
            {constants.ui.pagination.PAGE} {currentPage + 1}
          </span>
          <CommentPaginationButton
            onClick={() => {
              if (data?.totalPages) {
                goToNextPage(data.totalPages);
              }
            }}
            isDisabled={currentPage + 1 === data?.totalPages || (currentPage === 0 && data?.totalComments === 0)}
            value={constants.ui.pagination.NEXT}
          />
        </div>
        <CreateCommentForm applicationUuid={applicationUuid} />
      </Section>
    </>
  );
};
