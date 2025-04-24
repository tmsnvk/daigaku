/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { zodResolver } from '@hookform/resolvers/zod';
import { JSX } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

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
  CreateCommentPayload,
} from '@daigaku/common-types';

const formValidationSchema = z.object({
  comment: z
    .string()
    .nonempty({ message: l.PAGES.COMMON.APPLICATION_VIEW.COMMENTS.CREATE_COMMENT.VALIDATION.REQUIRED_COMMENT })
    .regex(/^(.|\s){15,1000}$/, {
      message: l.PAGES.COMMON.APPLICATION_VIEW.COMMENTS.CREATE_COMMENT.VALIDATION.PATTERN_COMMENT,
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
const FORM_ID = 'post-comment-form';

/**
 * Renders the comment submission form.
 *
 * @param {CreateCommentFormProps} props
 * @return {JSX.Element}
 */
export const CreateCommentForm = ({ applicationUuid }: CreateCommentFormProps): JSX.Element => {
  const methods = useForm<FormInputValues>({
    mode: 'onSubmit',
    defaultValues: initialFormValues,
    resolver: zodResolver(formValidationSchema),
  });
  const { handleSubmit, setError } = methods;

  const { mutate: createComment, isPending: isSubmitting } = useSubmitComment(setError, applicationUuid);

  return (
    <FormProvider {...methods}>
      <CoreFormWrapper
        formId={FORM_ID}
        onFormSubmit={handleSubmit((formData: FormInputValues) => {
          createComment(formData as CreateCommentPayload);
        })}
      >
        <CommonTextareaGroup
          id={'comment'}
          isDisabled={isSubmitting}
          rows={DEFAULT_ROW_SIZE}
          cols={DEFAULT_COL_SIZE}
          label={l.PAGES.COMMON.APPLICATION_VIEW.COMMENTS.CREATE_COMMENT.FORM.CONTENT.LABEL}
          placeholder={l.PAGES.COMMON.APPLICATION_VIEW.COMMENTS.CREATE_COMMENT.FORM.CONTENT.PLACEHOLDER}
          intent={CoreTextareaElementStyleIntent.LIGHT}
        />
        <CoreFormAction
          submitId={FORM_ID}
          isSubmissionPending={isSubmitting}
          formActionConfig={{
            message: l.PAGES.COMMON.APPLICATION_VIEW.COMMENTS.CREATE_COMMENT.SUBMIT_LOADING,
            value: l.PAGES.COMMON.APPLICATION_VIEW.COMMENTS.CREATE_COMMENT.SUBMIT_INPUT,
          }}
          intent={CoreSubmitInputElementStyleIntent.DARK}
        />
      </CoreFormWrapper>
    </FormProvider>
  );
};
