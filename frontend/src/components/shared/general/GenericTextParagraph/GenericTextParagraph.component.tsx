import { TextContainer } from './GenericTextParagraph.styles.ts';

type ComponentPropsT = {
  text: string;
}

const GenericTextParagraph = ({ text }: ComponentPropsT) => {
  return (
    <TextContainer>
      {text}
    </TextContainer>
  );
};

export default GenericTextParagraph;
