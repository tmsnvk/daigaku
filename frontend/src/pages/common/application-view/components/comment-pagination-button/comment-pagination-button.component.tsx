/**
 * @prettier
 */

/* component, style imports */
import { Button } from './comment-pagination-button.styles.ts';

/* interfaces, types, enums */
interface ComponentProps {
  readonly onClick: () => void;
  readonly isDisabled: boolean;
  readonly content: string;
}

/*
 * component - TODO - add functionality description
 */
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
