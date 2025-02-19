/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { useForm } from 'react-hook-form';

/* logic imports */
import { useSubmitComment } from './create-comment-form.hooks';

/* component, style imports */
import { GenericTextarea, InputError, SubmitInput } from '@components/form';
import { LoadingIndicator } from '@components/general';
import { Form } from './create-comment-form.styles';

/* configuration, utilities, constants imports */
import { localization as l } from '@constants';

/* interface, type, enum imports */
import { CreateComment } from '@common-types';

/**
 * Defines the component's properties.
 */
interface ComponentProps {
  /**
   * The application record's uuid string used in the REST API request when the user submits a new comment.
   */
  readonly applicationUuid: string;
}

/**
 * Renders the comments on the selected pagination page.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element}
 */
export const CreateCommentForm = ({ applicationUuid }: ComponentProps): JSX.Element => {
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
      <article>{errors.root && <InputError message={errors.root.message} />}</article>
    </Form>
  );
};
