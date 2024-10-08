/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
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
import { CommentMeta, SimpleQueryResult } from '@common-types';
import { LoadingIndicator } from '@components/general';

/**
 * ===============
 * Component {@link CommentSection}
 * ===============
 */

/* interfaces, types, enums */
interface ComponentProps {
  readonly applicationUuid: string;
}

/**
 * @description
 * The component renders the comment section in a single application's {@link ApplicationView} page.
 *
 * @param {string} props.applicationUuid
 * The application's UUID is used in the REST API request when the user submits a new comment.
 *
 * @returns {JSX.Element}
 *
 * @since 0.0.1
 */
export const CommentSection = ({ applicationUuid }: ComponentProps): JSX.Element => {
  const { currentPage, goToPreviousPage, goToNextPage }: CommentPagination = useCommentPagination();
  const { data, isLoading, isError }: SimpleQueryResult<CommentMeta> = useCommentsByApplicationAndPagination(applicationUuid, currentPage);

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
