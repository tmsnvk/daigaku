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
import { useCreateCommentForm } from '../hooks/use-create-comment-form.tsx';
import { CreateCommentSchema, createCommentSchema } from '../schema.ts';

/* component imports */
import { FormWrapper, SubmitInputGroup, TextareaGroup } from '@daigaku/components/common/form';

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

  const { mutate: createComment, isPending: isSubmitting } = useCreateCommentForm(applicationUuid, setError, reset);

  const onFormSubmit = handleSubmit((formData: CreateCommentSchema): void => {
    createComment(formData as CreateApplicationCommentPayload);
  });

  return (
    <FormProvider {...formMethods}>
      <FormWrapper
        formId={'comment-form'}
        onFormSubmit={onFormSubmit}
      >
        <TextareaGroup
          cols={DEFAULT_COL_SIZE}
          disabled={isSubmitting}
          id={'comment'}
          intent={'light'}
          label={t('app.page.applicationView.comment.form.commentLabel')}
          placeholder={t('app.page.applicationView.comment.form.commentPlaceholder')}
          rows={DEFAULT_ROW_SIZE}
        />
        <SubmitInputGroup
          formActionConfig={{
            message: t('app.generic.loading.formSubmission'),
            value: t('app.page.applicationView.comment.form.submitButton'),
          }}
          intent={'dark'}
          isSubmissionPending={isSubmitting}
        />
      </FormWrapper>
    </FormProvider>
  );
};
