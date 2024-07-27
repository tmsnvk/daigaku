import { useForm } from 'react-hook-form';

import {
  NewCommentFormFields,
  useSubmitNewComment,
} from './new-comment-box.hooks';

import {
  InputError,
  InputLabel,
  SubmitInput,
} from '@components/form';
import { LoadingIndicator } from '@components/general';
import { Form } from './new-comment-box.styles';

interface ComponentProps {
  readonly applicationUuid: string;
}

const NewCommentBox = ({ applicationUuid }: ComponentProps) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<NewCommentFormFields>({ mode: 'onSubmit' });
  const { isPending, mutate } = useSubmitNewComment({ setError, applicationUuid });

  return (
    <Form
      id={'postCommentForm'}
      method={'POST'}
      onSubmit={handleSubmit((formData) => mutate(formData))}
    >
      <InputLabel
        inputId={'commentContent'}
        content={'Write your comment'}
      />
      <textarea
        {...register('commentContent', {
          required: { value: true, message: 'Add your comment.' },
          pattern: { value: /^(.|\s){5,1000}$/, message: 'Provide a minimum of 15 and a maximum of 1000 characters.' },
        })}
        id={'commentContent'}
        name={'commentContent'}
        rows={10}
        cols={50}
        autoComplete={'off'}
        placeholder={'Write a comment...'}
      />
      <article>
        {
          isPending ?
            <LoadingIndicator content={'Your comment is being submitted.'} /> :
            <SubmitInput type={'submit'} value={'add comment'} disabled={isPending} />
        }
      </article>
      <article>
        {errors.root?.serverError && <InputError content={errors.root.serverError.message as string} />}
      </article>
    </Form>
  );
};

export default NewCommentBox;
