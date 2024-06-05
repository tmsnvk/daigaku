import { AxiosError } from 'axios';
import { useGetCommentsByApplication } from './CommentSection.hooks.tsx';
import { LoadingIndicator } from '@components/form';
import { GlobalErrorModal } from '@components/notification';
import Comments from '../Comments';
import NewCommentBox from '../NewCommentBox';
import { Section } from './CommentSection.styles.ts';

type ComponentPropsT = {
  applicationUuid: string;
}

const CommentSection = ({ applicationUuid }: ComponentPropsT) => {
  const { data, isLoading, isError, error } = useGetCommentsByApplication(applicationUuid);

  if (isError && error instanceof AxiosError) {
    return <GlobalErrorModal error={error.response?.data.root} />;
  }

  return (
    isLoading ?
      <Section>
        <LoadingIndicator content={'Fetching comments.'} />
      </Section> :
      <Section>
        <Comments
          data={data ?? []}
        />
        <NewCommentBox
          applicationUuid={applicationUuid}
        />
      </Section>
  );
};

export default CommentSection;
