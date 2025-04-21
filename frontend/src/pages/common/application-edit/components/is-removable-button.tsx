/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* logic imports */
import { useToggleIsRemovable } from '../hooks';

/* component imports */
import { CoreFormElementError } from '@daigaku/components/form';
import { CoreButton } from '@daigaku/components/core';

/* configuration, utilities, constants imports */
import { errorConstants, localization as l } from '@daigaku/constants';
import { joinTw } from '@daigaku/utilities';

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
 * Renders and sets the state of the delete request button on an application's edit page.
 *
 * @return {JSX.Element}
 */
export const IsRemovableButton = ({ isRemovable, applicationUuid }: IsRemovableButtonProps): JSX.Element => {
  const { mutate, isPending, isError, shouldBeRemoved } = useToggleIsRemovable(applicationUuid, isRemovable);

  return (
    <article className={joinTw('col-start-2 col-end-3 row-start-2 row-end-3 flex flex-col items-center', 'h-40')}>
      <CoreButton
        label={
          shouldBeRemoved ?
            l.PAGES.COMMON.APPLICATION_EDIT.REMOVABLE_BUTTON.REVERT_REQUEST :
            l.PAGES.COMMON.APPLICATION_EDIT.REMOVABLE_BUTTON.DELETION_REQUEST
        }
        intent={shouldBeRemoved ? 'destructive' : 'dark'}
        onClick={() => mutate()}
        isDisabled={isPending}
      />
      {isError && <CoreFormElementError message={errorConstants.UNEXPECTED_GLOBAL_ERROR} />}
    </article>
  );
};
