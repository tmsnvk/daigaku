import { Paragraph } from './FormInstructionText.styles.ts';

type ComponentPropsT = {
  content: string;
}

const FormInstructionText = ({ content }: ComponentPropsT) => {
  return (
    <Paragraph>
      {content}
    </Paragraph>
  );
};

export default FormInstructionText;
