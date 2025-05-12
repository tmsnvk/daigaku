/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { JSX } from 'react';

/* component imports */
import { CoreLoadingDialog } from '../core';

/* configuration, utilities, constants imports */
import { iconLibraryConfig } from '@daigaku/configuration';

/**
 * Defines the component's properties.
 */
interface LoadingModalProps {
  /**
   * Indicates whether the component should be visible.
   */
  readonly isVisible: boolean;
}

/**
 * Renders a loading status modal, providing feedback to the user.
 *
 * @param {LoadingModalProps} props
 * @return {JSX.Element}
 */
export const LoadingModal = ({ isVisible }: LoadingModalProps): JSX.Element => {
  return (
    <CoreLoadingDialog
      isVisible={isVisible}
      intent={'light'}
    >
      <div className={'flex flex-col'}>
        {/*<p>{t('dataCompilation')}</p>*/}
        <FontAwesomeIcon
          icon={iconLibraryConfig.faSpinner}
          spin
        />
      </div>
    </CoreLoadingDialog>
  );
};
