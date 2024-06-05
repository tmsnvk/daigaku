import { useGetCommentsByApplication } from './Comments.hooks.tsx';
import { ContainerArticle } from './Comments.styles.ts';
import { GlobalLoadingModal } from '@components/notification';

type ComponentPropsT = {
  applicationUuid: string;
}

const Comments = ({ applicationUuid }: ComponentPropsT) => {
  const { data, isLoading, isError, error } = useGetCommentsByApplication(applicationUuid);

  if (isLoading) {
    return <GlobalLoadingModal />;
  }
  console.log(data);
  return (
    <ContainerArticle>
      ALREADY ADDED COMMENTS
    </ContainerArticle>
  );
};

export default Comments;
