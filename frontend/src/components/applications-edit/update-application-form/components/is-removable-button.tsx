/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { useTranslation } from 'react-i18next';

/* logic imports */
import { useToggleIsRemovable } from '../hooks/use-toggle-is-removable.tsx';

/* component imports */
import { CoreButton } from '@daigaku/components/common/core';
import { CoreFormElementError } from '@daigaku/components/common/form';

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
  const { t } = useTranslation();

  const {
    mutate: toggleRemoveState,
    isSubmitting,
    isError,
    shouldBeRemoved,
  } = useToggleIsRemovable(applicationUuid, isRemovable);

  return (
    <article className={'col-start-2 col-end-3 row-start-2 row-end-3 flex h-40 flex-col items-center'}>
      <CoreButton
        label={
          shouldBeRemoved
            ? t('app.page.applicationEdit.removeRequest.requestReversion')
            : t('app.page.applicationEdit.removeRequest.requestDeletion')
        }
        intent={shouldBeRemoved ? 'destructive' : 'dark'}
        onClick={() => toggleRemoveState()}
        isDisabled={isSubmitting}
      />
      {isError && <CoreFormElementError message={t('app.generic.error.unexpectedError')} />}
    </article>
  );
};
