import { LoadingIndicator } from '@components/general';
import { Section } from './comment-section-loader.styles';

const CommentSectionLoader = () => {
  return (
    <Section>
      <LoadingIndicator content={'Fetching comments...'} />
    </Section>
  );
};

export default CommentSectionLoader;
