/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* logic imports */
import { useToggleIsRemovable } from '../hooks';

/* component, style imports */
import { CoreButton } from '@components/base-components';

/* configuration, utilities, constants imports */
import { CoreFormElementError } from '@components/form';
import { errorConstants, localization as l } from '@constants';

/**
 * Defines the component's properties.
 */
interface IsRemovableButtonProps {
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
export const IsRemovableButton = ({ isRemovable, applicationUuid }: IsRemovableButtonProps): JSX.Element => {
  const { mutate, isPending, isError, shouldBeRemoved } = useToggleIsRemovable(applicationUuid, isRemovable);

  return (
    <article className={'col-start-2 col-end-3 row-start-2 row-end-3 h-40 items-center flex flex-col'}>
      <CoreButton
        label={
          shouldBeRemoved
            ? l.PAGES.COMMON.APPLICATION_EDIT.REMOVABLE_BUTTON.REVERT_REQUEST
            : l.PAGES.COMMON.APPLICATION_EDIT.REMOVABLE_BUTTON.DELETION_REQUEST
        }
        intent={shouldBeRemoved ? 'destructive' : 'dark'}
        onClick={() => mutate()}
        isDisabled={isPending}
      />
      {isError && <CoreFormElementError message={errorConstants.UNEXPECTED_GLOBAL_ERROR} />}
    </article>
  );
};
