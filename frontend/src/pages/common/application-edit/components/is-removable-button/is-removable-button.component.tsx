/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 */

/* logic imports */
import { HandleToggleIsRemovable, useToggleIsRemovable } from './is-removable-button.hooks';

/* component, style imports */
import { InputError } from '@components/form';
import { Article } from './is-removable-button.styles';

/* configuration, utilities, constants imports */
import { UNEXPECTED_GLOBAL_ERROR } from '@constants';
import { constants } from './is-removable-button.constants';

/**
 * ===============
 * Component {@link IsRemovableButton}
 * ===============
 */

/**
 * Defines the properties of the {@link IsRemovableButton} component.
 *
 * @since 0.0.1
 */
interface ComponentProps {
  readonly isRemovable: boolean;
  readonly applicationUuid: string;
}

/**
 * Renders and sets the state of the delete request button on each applcation edit page.
 *
 * @return {JSX.Element}
 *
 * @since 0.0.1
 */
export const IsRemovableButton = ({ isRemovable, applicationUuid }: ComponentProps): JSX.Element => {
  // Custom hook that handles toggling the component.
  const { mutate, isPending, isError, shouldBeRemoved }: HandleToggleIsRemovable = useToggleIsRemovable(applicationUuid, isRemovable);

  return (
    <Article $isRemovable={shouldBeRemoved}>
      <button
        type={'button'}
        onClick={() => mutate()}
        disabled={isPending}
      >
        {shouldBeRemoved ? constants.buttonState.REVERT_REQUEST : constants.buttonState.REQUEST_DELETION}
      </button>
      {isError && <InputError message={UNEXPECTED_GLOBAL_ERROR} />}
    </Article>
  );
};
