import { ErrorMessageContainer } from './ErrorMessage.styles';

type ComponentPropT = {
  errorMessage: string;
}

const ErrorMessage = ({ errorMessage }: ComponentPropT) => {
  return (
    <ErrorMessageContainer>
      {errorMessage}
    </ErrorMessageContainer>
  );
};

export default ErrorMessage;
