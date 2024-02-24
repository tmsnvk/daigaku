import { DialogContainer } from './GlobalErrorModal.styles.ts';

const GlobalErrorModal = () => {
  return (
    <DialogContainer>
      <p>The application has encountered an unexpected error. Refresh your browser and try again.</p>
    </DialogContainer>
  );
};

export default GlobalErrorModal;
