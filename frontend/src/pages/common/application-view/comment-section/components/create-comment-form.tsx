/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { zodResolver } from '@hookform/resolvers/zod';
import { JSX } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

/* logic imports */
import { useSubmitComment } from '../hooks/use-submit-comment.tsx';

/* component imports */
import { CommonTextareaGroup, CoreFormAction, CoreFormWrapper } from '@daigaku/components/form';

/* interface, type, enum, schema imports */
import {
  CoreSubmitInputElementStyleIntent,
  CoreTextareaElementStyleIntent,
  CreateCommentPayload,
} from '@daigaku/common-types';
import { FormInputValues, createCommentFormValidationSchema } from '../schema.ts';

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

  const formMethods = useForm<FormInputValues>({
    mode: 'onSubmit',
    defaultValues: {
      comment: '',
    },
    resolver: zodResolver(createCommentFormValidationSchema),
  });
  const { handleSubmit, setError } = formMethods;
  const { mutate: createComment, isPending: isSubmitting } = useSubmitComment(setError, applicationUuid);
  const submitCreateCommentForm = (formData: FormInputValues): void => {
    createComment(formData as CreateCommentPayload);
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
          intent={CoreTextareaElementStyleIntent.LIGHT}
        />
        <CoreFormAction
          isSubmissionPending={isSubmitting}
          formActionConfig={{
            message: t('genericFormSubmission'),
            value: t('createCommentFormSubmit'),
          }}
          intent={CoreSubmitInputElementStyleIntent.DARK}
        />
      </CoreFormWrapper>
    </FormProvider>
  );
};
