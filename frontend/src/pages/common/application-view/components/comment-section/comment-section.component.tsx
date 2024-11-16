/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

/* logic imports */
import { CommentPagination, useCommentPagination, useCommentsByApplicationAndPagination } from './comment-section.hooks';

/* component, style imports */
import { CommentPaginationButton } from '../comment-pagination-button/index';
import { Comments } from '../comments/index';
import { NewCommentForm } from '../new-comment-form/index';
import { Section } from './comment-section.styles';

/* configuration, utilities, constants imports */
import { constants } from './comment-section.constants';

/* interface, type, enum imports */
import { CommentPaginationData, SimpleQueryResult } from '@common-types';
import { LoadingIndicator } from '@components/general';

/**
 * ===============
 * Component {@link CommentSection}
 * ===============
 */

/**
 * Defines the properties of the {@link CommentSection} component.
 *
 * @since 0.0.1
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
 *
 * @since 0.0.1
 */
export const CommentSection = ({ applicationUuid }: ComponentProps): JSX.Element => {
  // Custom hook that handles the comment page pagination.
  const { currentPage, goToPreviousPage, goToNextPage }: CommentPagination = useCommentPagination();

  // Custom hook that fetches comments for the selected application.
  const { data, isLoading, isError }: SimpleQueryResult<CommentPaginationData> = useCommentsByApplicationAndPagination(
    applicationUuid,
    currentPage,
  );

  return (
    <>
      {isLoading ? (
        <LoadingIndicator loadingText={constants.ui.LOADING} />
      ) : (
        <Section>
          <Comments
            comments={data?.comments ?? []}
            isError={isError}
          />
          <div>
            <CommentPaginationButton
              onClick={goToPreviousPage}
              isDisabled={data?.currentPage === 0}
              value={constants.ui.PREVIOUS}
            />
            <span>
              {constants.ui.PAGE} {currentPage + 1}
            </span>
            <CommentPaginationButton
              onClick={() => {
                if (data?.totalPages) {
                  goToNextPage(data.totalPages);
                }
              }}
              isDisabled={currentPage + 1 === data?.totalPages || (currentPage === 0 && data?.totalComments === 0)}
              value={constants.ui.NEXT}
            />
          </div>
          <NewCommentForm applicationUuid={applicationUuid} />
        </Section>
      )}
    </>
  );
};
