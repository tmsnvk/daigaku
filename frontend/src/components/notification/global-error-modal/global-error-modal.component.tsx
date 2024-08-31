/**
 * @prettier
 */

/* component, style imports */
import { Dialog } from './global-error-modal.styles.ts';

/* interfaces, types, enums */
interface ComponentProps {
  readonly message?: string;
}

/*
 * component - TODO - add functionality description
 */
export const GlobalErrorModal = ({ message }: ComponentProps) => {
  return (
    <Dialog>
      <p>The application has encountered an unexpected error.</p>
      {message ? <p>{message}</p> : ''}
      <p>Refresh your browser and try again.</p>
    </Dialog>
  );
};
