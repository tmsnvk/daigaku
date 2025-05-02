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
import { z } from 'zod';

/* logic imports */
import { useSubmitComment } from '../hooks';

/* component imports */
import { CommonTextareaGroup, CoreFormAction, CoreFormWrapper } from '@daigaku/components/form';

/* configuration, utilities, constants imports */
import { TranslationKey } from '@daigaku/constants';

/* interface, type, enum imports */
import {
  CoreSubmitInputElementStyleIntent,
  CoreTextareaElementStyleIntent,
  CreateCommentPayload,
} from '@daigaku/common-types';

const formValidationSchema = z.object({
  comment: z
    .string()
    .nonempty({ message: TranslationKey.COMMENT_REQUIRED })
    .regex(/^(.|\s){15,1000}$/, {
      message: TranslationKey.COMMENT_REQUIRED,
    }),
});

type FormInputValues = z.infer<typeof formValidationSchema>;

const initialFormValues: FormInputValues = {
  comment: '',
};

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
    defaultValues: initialFormValues,
    resolver: zodResolver(formValidationSchema),
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
