/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

/* logic imports */
import { useSubmitComment } from '../hooks';

/* component imports */
import { CommonTextareaGroup, CoreFormAction, CoreFormWrapper } from '@daigaku/components/form';

/* configuration, utilities, constants imports */
import { localization as l } from '@daigaku/constants';

/* interface, type, enum imports */
import {
  CoreSubmitInputElementStyleIntent,
  CoreTextareaElementStyleIntent,
  CreateComment,
} from '@daigaku/common-types';

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

  const methods = useForm<CreateComment>({ mode: 'onSubmit' });
  const {
    formState: { errors },
    handleSubmit,
    setError,
  } = methods;

  const { isPending, mutate } = useSubmitComment(setError, applicationUuid);

  return (
    <FormProvider {...methods}>
      <CoreFormWrapper
        formId={'post-comment-form'}
        onFormSubmit={handleSubmit((formData: CreateComment) => {
          mutate(formData);
        })}
      >
        <CommonTextareaGroup
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
          intent={CoreTextareaElementStyleIntent.LIGHT}
        />
        <CoreFormAction
          isSubmissionPending={isPending}
          submissionMessage={l.PAGES.COMMON.APPLICATION_VIEW.COMMENTS.CREATE_COMMENT.SUBMIT_LOADING}
          submitId={'post-comment-form'}
          submissionValue={l.PAGES.COMMON.APPLICATION_VIEW.COMMENTS.CREATE_COMMENT.SUBMIT_INPUT}
          errorMessage={errors.root?.message}
          submitButtonStyleIntent={CoreSubmitInputElementStyleIntent.DARK}
        />
      </CoreFormWrapper>
    </FormProvider>
  );
};
