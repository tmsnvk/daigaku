import { TextContainer } from './GenericTextParagraph.styles.ts';

type ComponentPropsT = {
  content: string;
}

const GenericTextParagraph = ({ content }: ComponentPropsT) => {
  return (
    <TextContainer>
      {content}
    </TextContainer>
  );
};

export default GenericTextParagraph;
