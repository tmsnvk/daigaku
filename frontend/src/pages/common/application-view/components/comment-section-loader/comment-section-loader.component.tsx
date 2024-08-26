/**
 * @prettier
 */

import { LoadingIndicator } from '@components/general';
import { Section } from './comment-section-loader.styles';

export const CommentSectionLoader = () => {
  return (
    <Section>
      <LoadingIndicator content={'Fetching comments...'} />
    </Section>
  );
};
