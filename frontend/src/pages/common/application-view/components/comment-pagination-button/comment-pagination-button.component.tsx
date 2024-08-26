/**
 * @prettier
 */

import { Button } from './comment-pagination-button.styles.ts';

interface ComponentProps {
  readonly onClick: () => void;
  readonly isDisabled: boolean;
  readonly content: string;
}

export const CommentPaginationButton = ({ onClick, isDisabled, content }: ComponentProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={isDisabled}
    >
      {content}
    </Button>
  );
};
