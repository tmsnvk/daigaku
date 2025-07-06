/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { JSX } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

/* logic imports */
import { useSubmitComment } from '../hooks/use-submit-comment.tsx';
import { CreateCommentSchema, createCommentSchema } from '../schema.ts';

/* component imports */
import { CommonTextareaGroup, CoreFormAction, CoreFormWrapper } from '@daigaku/components/form';

/* interface, type imports */
import { CreateApplicationCommentPayload } from '@daigaku/common-types';

/**
 * Defines the component's properties.
 */
interface CreateCommentFormProps {
  /**
   * The application record's uuid string used in the server request when the user submits a new comment.
   */
  readonly applicationUuid: string;
}

const DEFAULT_ROW_SIZE = 10;
const DEFAULT_COL_SIZE = 10;

/**
 * Renders the comment submission form.
 *
 * @param {CreateCommentFormProps} props
 * @return {JSX.Element}
 */
export const CreateCommentForm = ({ applicationUuid }: CreateCommentFormProps): JSX.Element => {
  const { t } = useTranslation();

  const formMethods = useForm<CreateCommentSchema>({
    defaultValues: {
      comment: '',
    },
    mode: 'onSubmit',
    resolver: standardSchemaResolver(createCommentSchema),
  });

  const { handleSubmit, setError, reset } = formMethods;

  const { mutate: createComment, isPending: isSubmitting } = useSubmitComment(applicationUuid, setError, reset);

  const submitCreateCommentForm = (formData: CreateCommentSchema): void => {
    createComment(formData as CreateApplicationCommentPayload);
  };

  return (
    <FormProvider {...formMethods}>
      <CoreFormWrapper
        formId={'post-comment-form'}
        onFormSubmit={handleSubmit(submitCreateCommentForm)}
      >
        <CommonTextareaGroup
          id={'comment'}
          isDisabled={isSubmitting}
          rows={DEFAULT_ROW_SIZE}
          cols={DEFAULT_COL_SIZE}
          label={t('commentLabel')}
          placeholder={t('commentPlaceholder')}
          intent={'light'}
        />
        <CoreFormAction
          isSubmissionPending={isSubmitting}
          formActionConfig={{
            message: t('genericFormSubmission'),
            value: t('createCommentFormSubmit'),
          }}
          intent={'dark'}
        />
      </CoreFormWrapper>
    </FormProvider>
  );
};
