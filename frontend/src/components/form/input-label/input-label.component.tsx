import { Label } from './input-label.styles';

interface ComponentProps {
  readonly inputId: string;
  readonly content: string;
}

const InputLabel = ({ inputId, content }: ComponentProps) => {
  return (
    <Label
      htmlFor={inputId}
    >
      {content}
    </Label>
  );
};

export default InputLabel;
