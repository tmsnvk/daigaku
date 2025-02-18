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
import { errorConstants } from '@constants';
import { constants } from './is-removable-button.constants';

/**
 * Defines the component's properties.
 */
interface ComponentProps {
  /**
   * The Application record's boolean deletion request flag.
   */
  readonly isRemovable: boolean;

  /**
   * The Application record's uuid string.
   */
  readonly applicationUuid: string;
}

/**
 * Renders and sets the state of the delete request button on each Application's edit page.
 *
 * @return {JSX.Element}
 */
export const IsRemovableButton = ({ isRemovable, applicationUuid }: ComponentProps): JSX.Element => {
  const { mutate, isPending, isError, shouldBeRemoved } = useToggleIsRemovable(applicationUuid, isRemovable);

  return (
    <Article $isRemovable={shouldBeRemoved}>
      <button
        type={'button'}
        onClick={() => mutate()}
        disabled={isPending}
      >
        {shouldBeRemoved ? constants.ui.button.REVERT_REQUEST : constants.ui.button.DELETION_REQUEST}
      </button>
      {isError && <InputError message={errorConstants.UNEXPECTED_GLOBAL_ERROR} />}
    </Article>
  );
};
