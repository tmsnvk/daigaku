/**
 * @prettier
 */

import { Dialog } from './global-error-modal.styles.ts';

interface ComponentProps {
  readonly content?: string;
}

export const GlobalErrorModal = ({ content }: ComponentProps) => {
  return (
    <Dialog>
      <p>The application has encountered an unexpected error.</p>
      {content ? <p>{content}</p> : ''}
      <p>Refresh your browser and try again.</p>
    </Dialog>
  );
};
