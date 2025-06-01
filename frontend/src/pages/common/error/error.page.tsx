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
import { iconLibrary } from '@daigaku/constants';

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
        <FontAwesomeIcon icon={iconLibrary.faCircleExclamation} />
        Sorry, an unexpected error has occurred.
      </p>
      <p>{error.message}</p>
    </section>
  );
};
