/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { JSX } from 'react';
import { useRouteError } from 'react-router-dom';

/* configuration, utilities, constants imports */
import { iconLibraryConfig } from '@daigaku/configuration';

/**
 * Renders the application's error page.
 *
 * @return {JSX.Element | undefined}
 */
export const Error = (): JSX.Element => {
  const error = useRouteError() as Error;

  return (
    <section>
      <h1>Oops!</h1>
      <p>
        <FontAwesomeIcon icon={iconLibraryConfig.faCircleExclamation} />
        Sorry, an unexpected error has occurred.
      </p>
      <p>{error.message}</p>
    </section>
  );
};
