import Comments from '../Comments';
import NewCommentBox from '../NewCommentBox';
import { Section } from './CommentSection.styles.ts';

type ComponentPropsT = {
  applicationUuid: string;
}

const CommentSection = ({ applicationUuid }: ComponentPropsT) => {
  return (
    <Section>
      <Comments
        applicationUuid={applicationUuid}
      />
      <NewCommentBox
        applicationUuid={applicationUuid}
      />
    </Section>
  );
};

export default CommentSection;
