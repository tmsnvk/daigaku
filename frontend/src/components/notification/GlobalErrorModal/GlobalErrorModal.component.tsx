import { Dialog } from './GlobalErrorModal.styles.ts';

type ComponentPropsT = {
  content?: string;
}

const GlobalErrorModal = ({ content }: ComponentPropsT) => {
  return (
    <Dialog>
      <p>The application has encountered an unexpected error.</p>
      {content ?? <p>{content}</p>}
      <p>Refresh your browser and try again.</p>
    </Dialog>
  );
};

export default GlobalErrorModal;
