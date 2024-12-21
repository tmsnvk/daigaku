/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* external imports */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { JSX } from 'react';
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
 * Renders the application's error page.
 *
 * @return {JSX.Element | undefined}
 *
 * @since 0.0.1
 */
export const Error = (): JSX.Element => {
  // `react-router-dom` error object.
  const error = useRouteError() as Error;

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
