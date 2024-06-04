import { Article } from './InputInfoBox.styles.ts';

type ComponentPropsT = {
  content: string[];
}

const InputInfoBox = ({ content }: ComponentPropsT) => {
  return (
    <Article>
      {content.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
    </Article>
  );
};

export default InputInfoBox;
