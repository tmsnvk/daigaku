import { useRouteError } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { iconLibraryConfig } from '@configuration/index.ts';
import { ErrorContainer } from './Error.styles.ts';

const ErrorPage = () => {
  const error = useRouteError() as Error;

  return (
    <ErrorContainer>
      <h1>Oops!</h1>
      <p><FontAwesomeIcon icon={iconLibraryConfig.faCircleExclamation} />Sorry, an unexpected error has occurred.</p>
      <p>{error.message}</p>
    </ErrorContainer>
  );
};

export default ErrorPage;
