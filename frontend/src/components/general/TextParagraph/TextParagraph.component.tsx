import { Container } from './TextParagraph.styles.ts';

type ComponentPropsT = {
  content: string;
}

const TextParagraph = ({ content }: ComponentPropsT) => {
  return (
    <Container>
      {content}
    </Container>
  );
};

export default TextParagraph;
