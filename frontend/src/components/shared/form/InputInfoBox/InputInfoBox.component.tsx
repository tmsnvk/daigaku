import { ArticleContainer } from './InputInfoBox.styles.ts';

type ComponentPropsT = {
  content: string[];
}

const InputInfoBox = ({ content }: ComponentPropsT) => {
  return (
    <ArticleContainer>
      {content.map((paragraph, index) => {
        return <p key={index}>{paragraph}</p>;
      })}
    </ArticleContainer>
  );
};

export default InputInfoBox;
