import { Paragraph } from './input-error.styles';

interface ComponentProps {
  readonly content: string;
}

const InputError = ({ content }: ComponentProps) => {
  return (
    <Paragraph>
      {content}
    </Paragraph>
  );
};

export default InputError;
