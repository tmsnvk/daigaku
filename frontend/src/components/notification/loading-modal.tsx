/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { JSX } from 'react';

/* logic imports */
import { useRenderModal } from '@hooks';

/* component, style imports */
import { CoreDialog } from '..';

/* configuration, utilities, constants imports */
import { iconLibraryConfig } from '@configuration';

/**
 * Defines the component's properties.
 */
interface LoadingModalProps {
  /**
   * Indicates whether the component should be visible.
   */
  readonly isVisible: boolean;

  /**
   * The status text to be displayed.
   */
  readonly status: string;
}

/**
 * Renders a loading status modal, providing feedback to the user.
 *
 * @param {LoadingModalProps} props
 * @return {JSX.Element}
 */
export const LoadingModal = ({ isVisible, status }: LoadingModalProps): JSX.Element => {
  const { dialogRef } = useRenderModal(isVisible);

  return (
    <CoreDialog
      ref={dialogRef}
      intent={'light'}
    >
      <p>
        {status}{' '}
        <FontAwesomeIcon
          icon={iconLibraryConfig.faSpinner}
          spin
        />
      </p>
    </CoreDialog>
  );
};
