/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { useForm } from 'react-hook-form';

/* logic imports */
import { useSubmitNewComment } from './new-comment-form.hooks';

/* component, style imports */
import { GenericTextarea, InputError, SubmitInput } from '@components/form';
import { LoadingIndicator } from '@components/general';
import { Form } from './new-comment-form.styles';

/* configuration, utilities, constants imports */
import { constants } from './new-comment-form.constants';

/* interface, type, enum imports */
import { NewCommentFormFields, SubmitNewComment } from './new-comment-form.models';

/**
 * Defines the properties of the {@link NewCommentForm} component.
 */
interface ComponentProps {
  /**
   * The application's UUID is used in the REST API request when the user submits a new comment.
   */
  readonly applicationUuid: string;
}

/**
 * Renders the comments on the selected pagination page.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element}
 */
export const NewCommentForm = ({ applicationUuid }: ComponentProps): JSX.Element => {
  // The necessary `react-hook-form` methods and states.
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<NewCommentFormFields>({ mode: 'onSubmit' });

  // Custom hook that submits a new comment.
  const { isPending, mutate }: SubmitNewComment = useSubmitNewComment(setError, applicationUuid);

  return (
    <Form
      id={'post-comment-form'}
      method={'POST'}
      onSubmit={handleSubmit((formData) => mutate(formData))}
    >
      <GenericTextarea
        register={register}
        validationRules={{
          required: {
            value: true,
            message: constants.validation.REQUIRED_COMMENT,
          },
          pattern: {
            value: /^(.|\s){15,1000}$/,
            message: constants.validation.PATTERN_COMMENT,
          },
        }}
        id={'comment'}
        label={constants.form.commentConent.LABEL}
        rows={constants.ui.ROW_SIZE}
        cols={constants.ui.COLUMN_SIZE}
        placeholder={constants.form.commentConent.PLACEHOLDER}
        isDisabled={isPending}
        error={errors.comment?.message}
      />
      <article>
        {isPending ? (
          <LoadingIndicator loadingText={constants.ui.SUBMIT_LOADING} />
        ) : (
          <SubmitInput
            type={'submit'}
            value={constants.ui.SUBMIT_INPUT}
            disabled={isPending}
          />
        )}
      </article>
      <article>{errors.root && <InputError message={errors.root.message} />}</article>
    </Form>
  );
};
