/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 */

/* external imports */
import { useForm } from 'react-hook-form';

/* logic imports */
import { NewCommentFormFields, SubmitNewComment, useSubmitNewComment } from './new-comment-box.hooks';

/* component, style imports */
import { InputError, InputLabel, SubmitInput } from '@components/form';
import { LoadingIndicator } from '@components/general';
import { Form } from './new-comment-box.styles';

/* configuration, utilities, constants imports */
import { constants } from './new-comment-box.constants';

/**
 * ===============
 * Component {@link NewCommentBox}
 * ===============
 */

/* interfaces, types, enums */
interface ComponentProps {
  readonly applicationUuid: string;
}

/**
 * @description
 * The component renders the comments on the selected pagination page.
 *
 * @param {Array<Comment>} props.applicationUuid
 * The application's UUID is used in the REST API request when the user submits a new comment.
 *
 * @returns {JSX.Element}
 *
 * @since 0.0.1
 */
export const NewCommentBox = ({ applicationUuid }: ComponentProps): JSX.Element => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<NewCommentFormFields>({ mode: 'onSubmit' });
  const { isPending, mutate }: SubmitNewComment = useSubmitNewComment(setError, applicationUuid);

  return (
    <Form
      id={'post-comment-form'}
      method={'POST'}
      onSubmit={handleSubmit((formData) => mutate(formData))}
    >
      <InputLabel
        fieldId={'commentContent'}
        content={constants.form.commentConent.LABEL}
      />
      <textarea
        {...register('commentContent', {
          required: { value: true, message: constants.validation.REQUIRED_COMMENT },
          pattern: { value: /^(.|\s){5,1000}$/, message: constants.validation.PATTERN_COMMENT },
        })}
        id={'commentContent'}
        name={'commentContent'}
        rows={constants.ui.ROW_SIZE}
        cols={constants.ui.COLUMN_SIZE}
        autoComplete={'off'}
        placeholder={constants.form.commentConent.PLACEHOLDER}
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
      <article>{errors.root?.serverError && <InputError errorText={errors.root.serverError.message as string} />}</article>
    </Form>
  );
};
