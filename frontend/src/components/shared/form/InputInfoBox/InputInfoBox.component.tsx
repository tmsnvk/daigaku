import { SectionContainer } from './InputInfoBox.styles.ts';

type ComponentPropsT = {
  content: string[];
}

const InputInfoBox = ({ content }: ComponentPropsT) => {
  return (
    <SectionContainer>
      {content.map((paragraph, index) => {
        return <p key={index}>{paragraph}</p>;
      })}
    </SectionContainer>
  );
};

export default InputInfoBox;
