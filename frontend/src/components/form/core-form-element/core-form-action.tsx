/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* component imports */
import { CoreSubmitInputElementStyleIntent } from '@common-types';
import { CoreFormElementError, CoreSubmitInputElement } from '@components/form';
import { LoadingIndicator } from '@components/general';

/* interface, type, enum imports */

/**
 * Defines the component's properties.
 */
interface CoreFormActionProps {
  /**
   * The boolean indicating whether the form submission is pending.
   */
  readonly isSubmissionPending: boolean;

  /**
   * The form submission's loading message.
   */
  readonly submissionMessage: string;

  /**
   * The form submit element's id.
   */
  readonly submitId: string;

  /**
   * The form submit button's value.
   */
  readonly submissionValue: string;

  /**
   * The `formState.errors.root.message` field from the `react-hook-form` plugin.
   */
  readonly errorMessage: string | undefined;

  /**
   * The input element's style intent.
   */
  readonly submitButtonStyleIntent: CoreSubmitInputElementStyleIntent;
}

/**
 * Manages the form submission action. If the form submission is currently pending, a loading spinner with a message is shown,
 * otherwise the form's submit button is displayed. In case of an error, it is displayed.
 *
 * @param {CoreFormActionProps}
 * @returns {JSX.Element}
 */
export const CoreFormAction = ({
  isSubmissionPending,
  submissionMessage,
  submitId,
  submissionValue,
  errorMessage,
  submitButtonStyleIntent,
}: CoreFormActionProps): JSX.Element => {
  return (
    <article>
      {isSubmissionPending ? (
        <LoadingIndicator loadingText={submissionMessage} />
      ) : (
        <CoreSubmitInputElement
          id={submitId}
          value={submissionValue}
          isDisabled={isSubmissionPending}
          intent={submitButtonStyleIntent}
        />
      )}
      <CoreFormElementError message={errorMessage} />
    </article>
  );
};
