import { Button } from './CommentPaginationButton.styles.ts';

type ComponentPropsT = {
  onClick: () => void;
  isDisabled: boolean;
  content: string;
}

const CommentPaginationButton = ({ onClick, isDisabled, content }: ComponentPropsT) => {
  return (
    <Button
      onClick={onClick}
      disabled={isDisabled}
    >
      {content}
    </Button>
  );
};

export default CommentPaginationButton;
