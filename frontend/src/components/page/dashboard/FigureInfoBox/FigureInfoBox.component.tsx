import { BoxContainer } from './FigureInfoBox.styles.ts';

type ComponentPropsT = {
  title: string;
  content: string | number;
}

const FigureInfoBox = ({ title, content }: ComponentPropsT) => {
  return (
    <BoxContainer>
      <dt>
        {content}
      </dt>
      <dd>
        {title}
      </dd>
    </BoxContainer>
  );
};

export default FigureInfoBox;
