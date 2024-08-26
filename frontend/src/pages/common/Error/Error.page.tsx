/**
 * @prettier
 */

import { useRouteError } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ErrorContainer } from './error.styles';

import { iconLibraryConfig } from '@configuration';

export const Error = () => {
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
