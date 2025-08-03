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
import { CoreLoader } from '@daigaku/components/common/core';
import { CoreElementError } from '../core-element/core-element-error.tsx';
import { CoreSubmitInput, CoreSubmitVariantIntent } from '../core-element/core-submit-input.tsx';

/**
 * Defines the component's properties.
 */
interface SubmitInputGroupProps {
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
  readonly intent: CoreSubmitVariantIntent;

  /**
   * Additional style options.
   */
  readonly className?: string;
}

/**
 * Manages the form submission action. If the form submission is currently pending, a loading spinner with a message is
 * shown, otherwise the form's submit button is displayed. In case of an error, it is displayed.
 *
 * @param {SubmitInputGroupProps}
 * @returns {JSX.Element}
 */
export const SubmitInputGroup = ({
  isSubmissionPending,
  formActionConfig,
  intent,
  className,
}: SubmitInputGroupProps): JSX.Element => {
  const { formState } = useFormContext();

  return (
    <article className={joinTw('h-30 flex flex-col items-center', className)}>
      {isSubmissionPending ? (
        <CoreLoader loadingText={formActionConfig.message} />
      ) : (
        <CoreSubmitInput
          disabled={isSubmissionPending}
          id={'submit'}
          intent={intent}
          value={formActionConfig.value}
        />
      )}
      <CoreElementError message={formState.errors.root?.message} />
    </article>
  );
};
