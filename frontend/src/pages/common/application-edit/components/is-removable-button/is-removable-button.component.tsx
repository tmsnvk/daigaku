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
import { errorConstants, localization as l } from '@constants';

/**
 * Defines the component's properties.
 */
interface ComponentProps {
  /**
   * The application record's boolean deletion request flag.
   */
  readonly isRemovable: boolean;

  /**
   * The application record's uuid string.
   */
  readonly applicationUuid: string;
}

/**
 * Renders and sets the state of the delete request button on each application's edit page.
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
        {shouldBeRemoved
          ? l.PAGES.COMMON.APPLICATION_EDIT.REMOVABLE_BUTTON.REVERT_REQUEST
          : l.PAGES.COMMON.APPLICATION_EDIT.REMOVABLE_BUTTON.DELETION_REQUEST}
      </button>
      {isError && <InputError message={errorConstants.UNEXPECTED_GLOBAL_ERROR} />}
    </Article>
  );
};
