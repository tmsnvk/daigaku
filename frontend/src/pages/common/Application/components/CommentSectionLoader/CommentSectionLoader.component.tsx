import { LoadingIndicator } from '@components/general';
import { Section } from './CommentSectionLoader.styles.ts';

const CommentSectionLoader = () => {
  return (
    <Section>
      <LoadingIndicator content={'Fetching comments...'} />
    </Section>
  );
};

export default CommentSectionLoader;
