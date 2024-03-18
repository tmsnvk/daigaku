import { ModalContainer } from './FeedbackModal.styles.ts';

type ComponentPropsT = {
  isSubmitted: boolean;
  content: string;
}

const FeedbackModal = ({ isSubmitted, content }: ComponentPropsT) => {
  return (
    isSubmitted &&
    <ModalContainer>
      {content}
    </ModalContainer>
  );
};

export default FeedbackModal;
