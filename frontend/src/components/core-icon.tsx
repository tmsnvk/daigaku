/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { IconLookup } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { JSX } from 'react';

/* configuration, utilities, constants imports */
import { joinTw } from '@utilities';

/**
 * Defines the component's properties.
 */
interface CoreIconProps {
  /**
   * The icon component to be displayed.
   */
  readonly icon: IconLookup;

  /**
   * Optional style settings.
   */
  readonly className?: string;
}

/**
 * Renders the core icon component used throughout the application.
 *
 * @param {CoreIconProps}
 * @return {JSX.Element}
 */
export const CoreIcon = ({ icon, className }: CoreIconProps): JSX.Element => {
  return (
    <div className={'text-3xl'}>
      <FontAwesomeIcon
        icon={icon}
        className={joinTw(className)}
      />
    </div>
  );
};
