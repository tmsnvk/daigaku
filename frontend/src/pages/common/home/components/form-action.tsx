/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* component imports */
import { CoreInputError, SubmitInput } from '@components/form';
import { LoadingIndicator } from '@components/general';

/**
 * Defines the component's properties.
 */
interface FormActionProps {
  /**
   * The boolean indicating whether the form submission is pending.
   */
  readonly isSubmissionPending: boolean;

  /**
   * The form submission's loading message.
   */
  readonly submissionMessage: string;

  /**
   * The form submit field's id.
   */
  readonly submissionId: string;

  /**
   * The form submit button's value.
   */
  readonly submissionValue: string;

  /**
   * The `formState.errors.root.message` field from the `react-hook-form` plugin.
   */
  readonly errorMessage: string | undefined;
}

/**
 * Manages the form submission action. If the form submission is currently pending, a loading spinner with a message is shown,
 * otherwise the form's submit button is displayed. In case of an error, it is displayed.
 *
 * @param {FormActionProps}
 * @returns {JSX.Element}
 */
export const FormAction = ({
  isSubmissionPending,
  submissionMessage,
  submissionId,
  submissionValue,
  errorMessage,
}: FormActionProps): JSX.Element => {
  return (
    <article>
      {isSubmissionPending ? (
        <LoadingIndicator loadingText={submissionMessage} />
      ) : (
        <SubmitInput
          type={'submit'}
          id={submissionId}
          name={submissionId}
          value={submissionValue}
          disabled={isSubmissionPending}
        />
      )}
      <CoreInputError message={errorMessage} />
    </article>
  );
};
