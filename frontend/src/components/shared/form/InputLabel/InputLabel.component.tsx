import { LabelContainer } from './InputLabel.styles.ts';

type ComponentPropsT = {
  inputId: string;
  content: string;
}

const InputLabel = ({ inputId, content }: ComponentPropsT) => {
  return (
    <LabelContainer htmlFor={inputId}>
      {content}
    </LabelContainer>
  );
};

export default InputLabel;
