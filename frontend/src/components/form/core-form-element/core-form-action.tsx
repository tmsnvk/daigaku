/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* component imports */
import { LoadingIndicator } from '@daigaku/components/general';
import { CoreFormElementError, CoreSubmitInputElement } from '..';

/* configuration, utilities, constants imports */
import { joinTw } from '@daigaku/utilities';

/* interface, type, enum imports */
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
  submissionMessage,
  submitId,
  submissionValue,
  errorMessage,
  submitButtonStyleIntent,
  className,
}: CoreFormActionProps): JSX.Element => {
  return (
    <article className={joinTw(className, 'flex flex-col items-center', 'h-30')}>
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
