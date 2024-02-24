import { TitleContainer } from './GenericTitle.styles.ts';

type ComponentPropsT = {
  content: string;
}

const GenericTitle = ({ content }: ComponentPropsT) => {
  return (
    <TitleContainer>
      {content}
    </TitleContainer>
  );
};

export default GenericTitle;
