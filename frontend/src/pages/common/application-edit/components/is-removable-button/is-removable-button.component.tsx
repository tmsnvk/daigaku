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
import { ToggleIsRemovable, useToggleIsRemovable } from './is-removable-button.hooks';

/* component, style imports */
import { InputError } from '@components/form';
import { Article } from './is-removable-button.styles';

/* configuration, utilities, constants imports */
import { constants } from './is-removable-button.constants';

/**
 * ===============
 * Component {@link IsRemovableButton}
 * ===============
 */

interface ComponentProps {
  readonly isRemovable: boolean;
  readonly applicationUuid: string;
}

/**
 * @description
 * The component renders and sets the state of the delete request button on each applcation edit page.
 *
 * @returns {JSX.Element}
 *
 * @since 0.0.1
 */
export const IsRemovableButton = ({ isRemovable, applicationUuid }: ComponentProps): JSX.Element => {
  const { mutate, isPending, shouldBeDeleted, errorMessage }: ToggleIsRemovable = useToggleIsRemovable(applicationUuid, isRemovable);

  return (
    <Article $isRemovable={shouldBeDeleted}>
      <button
        type={'button'}
        onClick={() => mutate()}
        disabled={isPending}
      >
        {shouldBeDeleted ? constants.render.REVERT_REQUEST : constants.render.REQUEST_DELETION}
      </button>
      <InputError errorText={errorMessage} />
    </Article>
  );
};
