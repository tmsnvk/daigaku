/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { JSX } from 'react';

/* configuration, utilities, constants imports */
import { joinTw } from '@daigaku/utilities';

/**
 * Defines the component's properties.
 */
interface CoreIconProps extends FontAwesomeIconProps {
  /**
   * Optional style settings.
   */
  readonly className?: string;
}

/**
 * Renders the core icon component displaying FontAwesome icons used throughout the application.
 *
 * @param {CoreIconProps}
 * @return {JSX.Element}
 */
export const CoreIcon = ({ icon, className, ...rest }: CoreIconProps): JSX.Element => {
  return (
    <div className={'text-3xl'}>
      <FontAwesomeIcon
        icon={icon}
        className={joinTw(className)}
        {...rest}
      />
    </div>
  );
};
