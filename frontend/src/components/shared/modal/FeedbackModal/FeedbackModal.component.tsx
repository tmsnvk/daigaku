import { ModalContainer } from './FeedbackModal.styles.ts';

type ComponentPropsT = {
  isVisible: boolean;
  content: string;
}

const FeedbackModal = ({ isVisible, content }: ComponentPropsT) => {
  return (
    isVisible &&
    <ModalContainer>
      {content}
    </ModalContainer>
  );
};

export default FeedbackModal;
