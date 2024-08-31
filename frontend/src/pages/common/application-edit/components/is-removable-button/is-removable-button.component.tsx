/**
 * @prettier
 */

/* logic imports */
import { ToggleIsRemovable, useToggleIsRemovable } from './is-removable-button.hooks';

/* component, style imports */
import { InputError } from '@components/form';
import { Article } from './is-removable-button.styles';

interface ComponentProps {
  readonly isRemovable: boolean;
  readonly applicationUuid: string;
}

/*
 * component - TODO - add functionality description
 */
export const IsRemovableButton = ({ isRemovable, applicationUuid }: ComponentProps) => {
  const { mutate, isPending, shouldBeDeleted, errorMessage }: ToggleIsRemovable = useToggleIsRemovable(applicationUuid, isRemovable);

  return (
    <Article $isRemovable={shouldBeDeleted}>
      <button
        type={'button'}
        onClick={() => mutate()}
        disabled={isPending}
      >
        {shouldBeDeleted ? 'Remove request' : 'Request deletion'}
      </button>
      <InputError message={errorMessage} />
    </Article>
  );
};
