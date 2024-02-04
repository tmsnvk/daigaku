import { LabelContainer } from './InputLabel.styles.ts';

type ComponentPropT = {
  inputId: string;
  content: string;
}

const InputLabel = ({ inputId, content }: ComponentPropT) => {
  return (
    <LabelContainer htmlFor={inputId}>
      {content}
    </LabelContainer>
  );
};

export default InputLabel;
