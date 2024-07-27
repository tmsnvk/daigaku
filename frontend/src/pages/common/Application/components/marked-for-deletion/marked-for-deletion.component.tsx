import { useToggleDeletionMark } from './marked-for-deletion.hooks';

import { InputError } from '@components/form';
import { Article } from './marked-for-deletion.styles';

interface ComponentProps {
  readonly isMarked: boolean;
  readonly applicationUuid: string;
}

const MarkedForDeletion = ({ isMarked, applicationUuid }: ComponentProps) => {
  const { mutate, isPending, shouldBeDeleted, errorMessage } = useToggleDeletionMark(applicationUuid, isMarked);

  return (
    <Article
      $isMarked={shouldBeDeleted}
    >
      <button
        type={'button'}
        onClick={() => mutate()}
        disabled={isPending}
      >
        {shouldBeDeleted ? 'Remove request' : 'Request deletion'}
      </button>
      <InputError
        content={errorMessage}
      />
    </Article>
  );
};

export default MarkedForDeletion;
