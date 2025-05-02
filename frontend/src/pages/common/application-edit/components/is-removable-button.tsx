/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { useTranslation } from 'react-i18next';

/* logic imports */
import { useToggleIsRemovable } from '../hooks';

/* component imports */
import { CoreButton } from '@daigaku/components/core';
import { CoreFormElementError } from '@daigaku/components/form';

/* configuration, utilities, constants imports */
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
  const { t } = useTranslation();

  const {
    mutate: toggleRemoveState,
    isSubmitting,
    isError,
    shouldBeRemoved,
  } = useToggleIsRemovable(applicationUuid, isRemovable);

  return (
    <article className={joinTw('col-start-2 col-end-3 row-start-2 row-end-3 flex flex-col items-center', 'h-40')}>
      <CoreButton
        label={shouldBeRemoved ? t('requestReversion') : t('requestDeletion')}
        intent={shouldBeRemoved ? 'destructive' : 'dark'}
        onClick={() => toggleRemoveState()}
        isDisabled={isSubmitting}
      />
      {isError && <CoreFormElementError message={t('unexpectedGlobalError')} />}
    </article>
  );
};
