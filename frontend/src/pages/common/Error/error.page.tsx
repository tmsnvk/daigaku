/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 */

/* external imports */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouteError } from 'react-router-dom';

/* component, style imports */
import { ErrorContainer } from './error.styles';

/* configuration, utilities, constants imports */
import { iconLibraryConfig } from '@configuration';

/**
 * ===============
 * Component {@link Error}
 * ===============
 */

/**
 * @description
 * The page-level component renders the application's error page.
 *
 * @returns {JSX.Element | undefined}
 *
 * @since 0.0.1
 */
export const Error = (): JSX.Element => {
  const error = useRouteError() as Error;

  // - add styling.
  return (
    <ErrorContainer>
      <h1>Oops!</h1>
      <p>
        <FontAwesomeIcon icon={iconLibraryConfig.faCircleExclamation} />
        Sorry, an unexpected error has occurred.
      </p>
      <p>{error.message}</p>
    </ErrorContainer>
  );
};
