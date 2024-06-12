import { LoadingIndicator } from '@components/form';
import { SectionContainer } from './CommentSectionLoader.styles.ts';

const CommentSectionLoader = () => {
  return (
    <SectionContainer>
      <LoadingIndicator content={'Fetching comments...'} />
    </SectionContainer>
  );
};

export default CommentSectionLoader;
