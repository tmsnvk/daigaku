import { useToggleIsRemovable } from './is-removable-button.hooks';

import { InputError } from '@components/form';
import { Article } from './is-removable-button.styles';

interface ComponentProps {
  readonly isRemovable: boolean;
  readonly applicationUuid: string;
}

const IsRemovableButton = ({ isRemovable, applicationUuid }: ComponentProps) => {
  const { mutate, isPending, shouldBeDeleted, errorMessage } = useToggleIsRemovable(applicationUuid, isRemovable);

  return (
    <Article
      $isRemovable={shouldBeDeleted}
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

export default IsRemovableButton;
