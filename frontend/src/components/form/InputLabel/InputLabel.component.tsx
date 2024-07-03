import { Label } from './InputLabel.styles.ts';

type ComponentPropsT = {
  inputId: string;
  content: string;
}

const InputLabel = ({ inputId, content }: ComponentPropsT) => {
  return (
    <Label
      htmlFor={inputId}
    >
      {content}
    </Label>
  );
};

export default InputLabel;
