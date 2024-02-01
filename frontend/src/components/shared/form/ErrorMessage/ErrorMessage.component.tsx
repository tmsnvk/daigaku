import { ErrorMessageContainer } from './ErrorMessage.styles';

type ComponentPropT = {
  error: string;
}

const ErrorMessage = ({ error }: ComponentPropT) => {
  return (
    <ErrorMessageContainer>
      {error}
    </ErrorMessageContainer>
  );
};

export default ErrorMessage;
