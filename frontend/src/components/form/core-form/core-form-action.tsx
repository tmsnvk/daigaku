/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { useFormContext } from 'react-hook-form';

/* component imports */
import { LoadingIndicator } from '@daigaku/components/general';
import { CoreFormElementError, CoreSubmitInputElement } from '../index.ts';

/* configuration, utilities, constants imports */
import { joinTw } from '@daigaku/utilities';

/* interface, type, enum, schema imports */
import { CoreSubmitInputElementStyleIntent } from '@daigaku/common-types';

/**
 * Defines the component's properties.
 */
interface CoreFormActionProps {
  /**
   * The boolean indicating whether the form submission is pending.
   */
  readonly isSubmissionPending: boolean;

  /**
   * The boolean indicating whether the form is disabled. The key is used in forms containing a preliminary data fetch.
   */
  readonly isDisabled?: boolean;

  /**
   *
   */
  readonly formActionConfig: {
    message: string;
    value: string;
  };

  /**
   * The input element's style intent.
   */
  readonly intent: CoreSubmitInputElementStyleIntent;

  /**
   * Additional style options.
   */
  readonly className?: string;
}

/**
 * Manages the form submission action. If the form submission is currently pending, a loading spinner with a message is
 * shown, otherwise the form's submit button is displayed. In case of an error, it is displayed.
 *
 * @param {CoreFormActionProps}
 * @returns {JSX.Element}
 */
export const CoreFormAction = ({
  isSubmissionPending,
  isDisabled,
  formActionConfig,
  intent,
  className,
}: CoreFormActionProps): JSX.Element => {
  const { formState } = useFormContext();

  return (
    <article className={joinTw(className, 'flex flex-col items-center', 'h-30')}>
      {isSubmissionPending ? (
        <LoadingIndicator loadingText={formActionConfig.message} />
      ) : (
        <CoreSubmitInputElement
          id={'submit'}
          value={formActionConfig.value}
          isDisabled={(isSubmissionPending || isDisabled) ?? false}
          intent={intent}
        />
      )}
      <CoreFormElementError message={formState.errors.root?.message} />
    </article>
  );
};
