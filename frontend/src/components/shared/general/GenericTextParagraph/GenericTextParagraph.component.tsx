import { TextContainer } from './GenericTextParagraph.styles.ts';

type ComponentProps = {
  text: string;
}

const GenericTextParagraph = ({ text }: ComponentProps) => {
  return (
    <TextContainer>
      {text}
    </TextContainer>
  );
};

export default GenericTextParagraph;
