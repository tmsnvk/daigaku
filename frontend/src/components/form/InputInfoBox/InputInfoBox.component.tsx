import { Article } from './InputInfoBox.styles.ts';

type ComponentPropsT = {
  content: string[];
}

const InputInfoBox = ({ content }: ComponentPropsT) => {
  return (
    <Article>
      {content.map((paragraph, index) => {
        return <p key={index}>{paragraph}</p>;
      })}
    </Article>
  );
};

export default InputInfoBox;
