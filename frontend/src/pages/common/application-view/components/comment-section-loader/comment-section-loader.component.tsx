/**
 * @prettier
 */

/* component, style imports */
import { LoadingIndicator } from '@components/general';
import { Section } from './comment-section-loader.styles';

/*
 * component - TODO - add functionality description
 */
export const CommentSectionLoader = () => {
  return (
    <Section>
      <LoadingIndicator message={'Fetching comments...'} />
    </Section>
  );
};
