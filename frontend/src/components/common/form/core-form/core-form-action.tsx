/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { useFormContext } from 'react-hook-form';

/* logic imports */
import { joinTw } from '@daigaku/utilities';

/* component imports */
import { LoadingIndicator } from '@daigaku/components/common/general';
import { CoreFormElementError, CoreSubmitInputElement } from '../index.ts';

/* interface, type imports */
import { CorSubmitElementVariantIntent } from '../core-element/core-submit-input-element.tsx';

/**
 * Defines the component's properties.
 */
interface CoreFormActionProps {
  /**
   * The boolean indicating whether the form submission is pending.
   */
  readonly isSubmissionPending: boolean;

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
  readonly intent: CorSubmitElementVariantIntent;

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
          isDisabled={isSubmissionPending}
          intent={intent}
        />
      )}
      <CoreFormElementError message={formState.errors.root?.message} />
    </article>
  );
};
