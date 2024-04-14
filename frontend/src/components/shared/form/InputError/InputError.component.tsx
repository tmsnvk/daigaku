import { Paragraph } from './InputError.styles.ts';

type ComponentPropsT = {
  content: string;
}

const InputError = ({ content }: ComponentPropsT) => {
  return (
    <Paragraph>
      {content}
    </Paragraph>
  );
};

export default InputError;
