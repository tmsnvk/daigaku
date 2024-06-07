import { useForm } from 'react-hook-form';
import {
  NewCommentFormFieldsT,
  useSubmitNewComment,
} from '@pages/shared/Application/components/NewCommentBox/NewCommentBox.hooks.tsx';
import {
  InputError, InputLabel,
  LoadingIndicator,
  SubmitInput,
} from '@components/form';
import { Form } from './NewCommentBox.styles.ts';

type ComponentPropsT = {
  applicationUuid: string;
}

const NewCommentBox = ({ applicationUuid }: ComponentPropsT) => {
  const { formState: { errors }, handleSubmit, register, setError } = useForm<NewCommentFormFieldsT>({ mode: 'onSubmit' });
  const { data, isPending, isSuccess, mutate } = useSubmitNewComment({ setError, applicationUuid });

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
