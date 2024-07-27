import { TitleHeading } from './page-title.styles.ts';

interface ComponentProps {
  readonly content: string;
}

const PageTitle = ({ content }: ComponentProps) => {
  return (
    <TitleHeading>
      {content}
    </TitleHeading>
  );
};

export default PageTitle;
