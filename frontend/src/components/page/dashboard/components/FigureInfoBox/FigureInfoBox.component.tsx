import { DescriptionList } from './FigureInfoBox.styles.ts';

type ComponentPropsT = {
  title: string;
  content: string | number;
}

const FigureInfoBox = ({ title, content }: ComponentPropsT) => {
  return (
    <DescriptionList>
      <dt>
        {content}
      </dt>
      <dd>
        {title}
      </dd>
    </DescriptionList>
  );
};

export default FigureInfoBox;
