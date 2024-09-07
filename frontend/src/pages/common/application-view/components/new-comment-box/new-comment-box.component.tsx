/**
 * @prettier
 */

/* external imports */
import { useForm } from 'react-hook-form';

/* logic imports */
import { NewCommentFormFields, SubmitNewComment, useSubmitNewComment } from './new-comment-box.hooks';

/* component, style imports */
import { InputError, InputLabel, SubmitInput } from '@components/form';
import { LoadingIndicator } from '@components/general';
import { Form } from './new-comment-box.styles';

/* interfaces, types, enums */
interface ComponentProps {
  readonly applicationUuid: string;
}

/*
 * component - TODO - add functionality description
 */
export const NewCommentBox = ({ applicationUuid }: ComponentProps) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<NewCommentFormFields>({ mode: 'onSubmit' });
  const ROW_NUMBER = 10;
  const COLUMN_NUMBER = 50;
  const { isPending, mutate }: SubmitNewComment = useSubmitNewComment(setError, applicationUuid);

  return (
    <Form
      id={'postCommentForm'}
      method={'POST'}
      onSubmit={handleSubmit((formData) => mutate(formData))}
    >
      <InputLabel
        id={'commentContent'}
        content={'Write your comment'}
      />
      <textarea
        {...register('commentContent', {
          required: { value: true, message: 'Add your comment.' },
          pattern: { value: /^(.|\s){5,1000}$/, message: 'Provide a minimum of 15 and a maximum of 1000 characters.' },
        })}
        id={'commentContent'}
        name={'commentContent'}
        rows={ROW_NUMBER}
        cols={COLUMN_NUMBER}
        autoComplete={'off'}
        placeholder={'Write a comment...'}
      />
      <article>
        {isPending ? (
          <LoadingIndicator loadingText={'Your comment is being submitted.'} />
        ) : (
          <SubmitInput
            type={'submit'}
            value={'add comment'}
            disabled={isPending}
          />
        )}
      </article>
      <article>{errors.root?.serverError && <InputError errorText={errors.root.serverError.message as string} />}</article>
    </Form>
  );
};
