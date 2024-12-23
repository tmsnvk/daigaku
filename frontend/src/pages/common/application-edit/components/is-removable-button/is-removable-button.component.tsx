/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* logic imports */
import { useToggleIsRemovable } from './is-removable-button.hooks';

/* component, style imports */
import { InputError } from '@components/form';
import { Article } from './is-removable-button.styles';

/* configuration, utilities, constants imports */
import { UNEXPECTED_GLOBAL_ERROR } from '@constants';
import { constants } from './is-removable-button.constants';
import { HandleToggleIsRemovable } from './is-removable-button.models';

/**
 * Defines the properties of the {@link IsRemovableButton} component.
 */
interface ComponentProps {
  readonly isRemovable: boolean;
  readonly applicationUuid: string;
}

/**
 * Renders and sets the state of the delete request button on each applcation edit page.
 *
 * @return {JSX.Element}
 */
export const IsRemovableButton = ({ isRemovable, applicationUuid }: ComponentProps): JSX.Element => {
  const { mutate, isPending, isError, shouldBeRemoved }: HandleToggleIsRemovable = useToggleIsRemovable(applicationUuid, isRemovable);

  return (
    <Article $isRemovable={shouldBeRemoved}>
      <button
        type={'button'}
        onClick={() => mutate()}
        disabled={isPending}
      >
        {shouldBeRemoved ? constants.ui.button.REVERT_REQUEST : constants.ui.button.DELETION_REQUEST}
      </button>
      {isError && <InputError message={UNEXPECTED_GLOBAL_ERROR} />}
    </Article>
  );
};
