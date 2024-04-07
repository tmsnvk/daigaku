import { Container } from './InputLabel.styles.ts';

type ComponentPropsT = {
  inputId: string;
  content: string;
}

const InputLabel = ({ inputId, content }: ComponentPropsT) => {
  return (
    <Container htmlFor={inputId}>
      {content}
    </Container>
  );
};

export default InputLabel;
