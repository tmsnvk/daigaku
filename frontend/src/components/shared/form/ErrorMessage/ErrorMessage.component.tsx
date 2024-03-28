import { ErrorMessageContainer } from './ErrorMessage.styles';

type ComponentPropsT = {
  content: string;
}

const ErrorMessage = ({ content }: ComponentPropsT) => {
  return (
    <ErrorMessageContainer>
      {content}
    </ErrorMessageContainer>
  );
};

export default ErrorMessage;
