import { useToggleDeletionMark } from './MarkedForDeletion.hooks.tsx';
import { InputError } from '@components/form';
import { Article } from './MarkedForDeletion.styles.ts';

type ComponentPropsT = {
  isMarked: boolean;
  applicationUuid: string;
}

const MarkedForDeletion = ({ isMarked, applicationUuid }: ComponentPropsT) => {
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
        {shouldBeDeleted ? 'Remove deletion request' : 'Mark for deletion'}
      </button>
      <InputError content={errorMessage} />
    </Article>
  );
};

export default MarkedForDeletion;
