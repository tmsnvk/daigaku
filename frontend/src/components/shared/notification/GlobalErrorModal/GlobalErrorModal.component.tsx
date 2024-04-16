import { Dialog } from './GlobalErrorModal.styles.ts';

type ComponentPropsT = {
  error: string;
}

const GlobalErrorModal = ({ error }: ComponentPropsT) => {
  return (
    <Dialog>
      <p>The application has encountered an unexpected error.</p>
      {error ?? <p>{error}</p>}
      <p>Refresh your browser and try again.</p>
    </Dialog>
  );
};

export default GlobalErrorModal;
