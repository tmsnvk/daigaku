import { TextContainer } from './GenericTextParagraph.styles.ts';

type ComponentPropsT = {
  content: string;
  fontSize?: string;
}

const GenericTextParagraph = ({ content, fontSize }: ComponentPropsT) => {
  return (
    <TextContainer $fontSize={fontSize}>
      {content}
    </TextContainer>
  );
};

export default GenericTextParagraph;
