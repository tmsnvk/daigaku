import { TextContainer } from './GenericTextParagraph.styles.ts';

type GenericTextParagraph = {
  text: string;
}

const GenericTextParagraph = ({ text }: GenericTextParagraph) => {
  return (
    <TextContainer>
      {text}
    </TextContainer>
  );
};

export default GenericTextParagraph;
