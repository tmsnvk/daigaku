import { TitleHeading } from './PageTitle.styles.ts';

type ComponentPropsT = {
  content: string;
}

const PageTitle = ({ content }: ComponentPropsT) => {
  return (
    <TitleHeading>
      {content}
    </TitleHeading>
  );
};

export default PageTitle;
