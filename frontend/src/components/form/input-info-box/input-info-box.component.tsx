import { Article } from './input-info-box.styles';

interface ComponentProps {
  readonly content: Array<string>;
}

const InputInfoBox = ({ content }: ComponentProps) => {
  return (
    <Article>
      {content.map((paragraph: string, index: number) => {
        return (
          <p
            key={index}
          >
            {paragraph}
          </p>
        );
      })}
    </Article>
  );
};

export default InputInfoBox;
