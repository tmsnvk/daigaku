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
  const { mutate, isPending, isError, shouldBeRemoved }: HandleToggleIsRemovable = useToggleIsRemovable(applicationUuid, isRemovable);

  return (
    <Article $isRemovable={shouldBeRemoved}>
      <button
        type={'button'}
        onClick={() => mutate()}
        disabled={isPending}
      >
        {shouldBeRemoved ? constants.render.REVERT_REQUEST : constants.render.REQUEST_DELETION}
      </button>
      {isError && <InputError errorText={UNEXPECTED_GLOBAL_ERROR} />}
    </Article>
  );
};
