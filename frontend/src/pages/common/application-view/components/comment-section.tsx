/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* logic imports */
import { useCommentPagination, useGetCommentsByApplicationAndPagination } from '../hooks';

/* component imports */
import { LoadingIndicator } from '@daigaku/components/general';
import { CommentPaginationButton } from './comment-pagination-button';
import { Comments } from './comments';
import { CreateCommentForm } from './create-comment-form';

/* configuration, utilities, constants imports */
import { localization as l } from '@daigaku/constants';

/**
 * Defines the component's properties.
 */
interface CommentSectionProps {
  /**
   * The application's uuid string to which the comment section belongs to.
   */
  readonly applicationUuid: string;
}

/**
 * Renders the comment section on an application record's view page.
 *
 * @param {CommentSectionProps} props
 * @return {JSX.Element}
 */
export const CommentSection = ({ applicationUuid }: CommentSectionProps): JSX.Element => {
  const { currentPage, goToPreviousPage, goToNextPage } = useCommentPagination();
  const { data, isLoading, isError } = useGetCommentsByApplicationAndPagination(applicationUuid, currentPage);

  if (isLoading) {
    return <LoadingIndicator loadingText={l.PAGES.COMMON.APPLICATION_VIEW.COMMENTS.LOADING} />;
  }

  return (
    <section className={'mx-auto my-20 w-[95%] sm:w-[65%] lg:w-[95%]'}>
      <Comments
        comments={data?.comments ?? []}
        isError={isError}
      />
      <div className={'mx-auto mb-20 flex w-[90%] flex-row items-center justify-around'}>
        <CommentPaginationButton
          onClick={goToPreviousPage}
          isDisabled={data?.currentPage === 0}
          value={l.PAGES.COMMON.APPLICATION_VIEW.COMMENTS.PAGINATION.PREVIOUS}
        />
        <span className={'text-xl'}>
          {l.PAGES.COMMON.APPLICATION_VIEW.COMMENTS.PAGINATION.PAGE} {currentPage + 1}
        </span>
        <CommentPaginationButton
          onClick={() => {
            if (data?.totalPages) {
              goToNextPage(data.totalPages);
            }
          }}
          isDisabled={currentPage + 1 === data?.totalPages || (currentPage === 0 && data?.totalComments === 0)}
          value={l.PAGES.COMMON.APPLICATION_VIEW.COMMENTS.PAGINATION.NEXT}
        />
      </div>
      <CreateCommentForm applicationUuid={applicationUuid} />
    </section>
  );
};
