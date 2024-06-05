import CommentBox from '../CommentBox';
import { Section } from './CommentSection.styles.ts';

type ComponentPropsT = {
  applicationUuid: string;
}

const CommentSection = ({ applicationUuid }: ComponentPropsT) => {
  // a custom hook should load in all comments.
  // RootCommentBox is to load in the root comment form.
  // when a reply is added load in a separate formbox directly below the given root comment.
  return (
    <Section>
      SECTION
      <CommentBox
        applicationUuid={applicationUuid}
      />
    </Section>
  );
};

export default CommentSection;
