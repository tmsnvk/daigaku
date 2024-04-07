import { Paragraph } from './ErrorMessage.styles';

type ComponentPropsT = {
  content: string;
}

const ErrorMessage = ({ content }: ComponentPropsT) => {
  return (
    <Paragraph>
      {content}
    </Paragraph>
  );
};

export default ErrorMessage;
