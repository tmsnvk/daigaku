import { Dialog } from './GlobalErrorModal.styles.ts';

const GlobalErrorModal = () => {
  return (
    <Dialog>
      <p>The application has encountered an unexpected error. Refresh your browser and try again.</p>
    </Dialog>
  );
};

export default GlobalErrorModal;
