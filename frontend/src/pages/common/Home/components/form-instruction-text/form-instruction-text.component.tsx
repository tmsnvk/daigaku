import { Paragraph } from './form-instruction-text.styles';

interface ComponentProps {
  readonly content: string;
}

const FormInstructionText = ({ content }: ComponentProps) => {
  return (
    <Paragraph>
      {content}
    </Paragraph>
  );
};

export default FormInstructionText;
