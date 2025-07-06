/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { useTranslation } from 'react-i18next';

/* logic imports */
import { joinTw } from '@daigaku/utilities';
import { useCommentPagination } from '../hooks/use-comment-pagination.tsx';
import { useGetCommentsByApplicationAndPagination } from '../hooks/use-get-comments-by-application-and-pagination.tsx';

/* component imports */
import { LoadingIndicator } from '@daigaku/components/general';
import { CommentPaginationButton } from './comment-pagination-button.tsx';
import { Comments } from './comments.tsx';
import { CreateCommentForm } from './create-comment-form.tsx';

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
  const { t } = useTranslation();

  const { currentPage, goToPreviousPage, goToNextPage } = useCommentPagination();
  const { data, isLoading, isError } = useGetCommentsByApplicationAndPagination(applicationUuid, currentPage);

  if (isLoading) {
    return <LoadingIndicator loadingText={t('dataCompilation')} />;
  }

  return (
    <section className={joinTw('w-[95%] sm:w-[65%] lg:w-[95%]', 'mx-auto my-20')}>
      <Comments
        comments={data?.comments ?? []}
        isError={isError}
      />
      <div className={joinTw('flex flex-row items-center justify-around', 'w-[90%]', 'mx-auto mb-20')}>
        <CommentPaginationButton
          onClick={goToPreviousPage}
          isDisabled={data?.currentPage === 0}
          value={t('previousPage')}
        />
        <span className={'text-xl'}>
          {t('page')} {currentPage + 1}
        </span>
        <CommentPaginationButton
          onClick={() => {
            if (data?.totalPages) {
              goToNextPage(data.totalPages);
            }
          }}
          isDisabled={currentPage + 1 === data?.totalPages || (currentPage === 0 && data?.totalComments === 0)}
          value={t('nextPage')}
        />
      </div>
      <CreateCommentForm applicationUuid={applicationUuid} />
    </section>
  );
};
