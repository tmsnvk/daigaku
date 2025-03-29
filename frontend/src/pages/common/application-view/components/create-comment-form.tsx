/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { useForm } from 'react-hook-form';

/* logic imports */
import { useSubmitComment } from '../hooks';

/* component imports */
import { CommonTextareaGroup, CoreFormElementError, SubmitInput } from '@components/form';
import { LoadingIndicator } from '@components/general';

/* configuration, utilities, constants imports */
import { localization as l } from '@constants';

/* interface, type, enum imports */
import { CreateComment } from '@common-types';

/**
 * Defines the component's properties.
 */
interface CreateCommentFormProps {
  /**
   * The application record's uuid string used in the server request when the user submits a new comment.
   */
  readonly applicationUuid: string;
}

/**
 * Renders the comment submission form.
 *
 * @param {CreateCommentFormProps} props
 * @return {JSX.Element}
 */
export const CreateCommentForm = ({ applicationUuid }: CreateCommentFormProps): JSX.Element => {
  const DEFAULT_ROW_SIZE = 10;
  const DEFAULT_COL_SIZE = 10;

  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<CreateComment>({ mode: 'onSubmit' });
  const { isPending, mutate } = useSubmitComment(setError, applicationUuid);

  return (
    <form
      id={'post-comment-form'}
      className={'flex flex-col items-center'}
      onSubmit={handleSubmit((formData) => mutate(formData))}
    >
      <CommonTextareaGroup
        register={register}
        validationRules={{
          required: {
            value: true,
            message: l.PAGES.COMMON.APPLICATION_VIEW.COMMENTS.CREATE_COMMENT.VALIDATION.REQUIRED_COMMENT,
          },
          pattern: {
            value: /^(.|\s){15,1000}$/,
            message: l.PAGES.COMMON.APPLICATION_VIEW.COMMENTS.CREATE_COMMENT.VALIDATION.PATTERN_COMMENT,
          },
        }}
        id={'comment'}
        label={l.PAGES.COMMON.APPLICATION_VIEW.COMMENTS.CREATE_COMMENT.FORM.CONTENT.LABEL}
        rows={DEFAULT_ROW_SIZE}
        cols={DEFAULT_COL_SIZE}
        placeholder={l.PAGES.COMMON.APPLICATION_VIEW.COMMENTS.CREATE_COMMENT.FORM.CONTENT.PLACEHOLDER}
        isDisabled={isPending}
        error={errors.comment?.message}
      />
      <article>
        {isPending ? (
          <LoadingIndicator loadingText={l.PAGES.COMMON.APPLICATION_VIEW.COMMENTS.CREATE_COMMENT.SUBMIT_LOADING} />
        ) : (
          <SubmitInput
            type={'submit'}
            value={l.PAGES.COMMON.APPLICATION_VIEW.COMMENTS.CREATE_COMMENT.SUBMIT_INPUT}
            disabled={isPending}
          />
        )}
      </article>
      <article>{errors.root && <CoreFormElementError message={errors.root.message} />}</article>
    </form>
  );
};
