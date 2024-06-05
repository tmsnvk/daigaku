import { useForm } from 'react-hook-form';
import {
  NewCommentFormFieldsT,
  useSubmitNewComment,
} from '@pages/shared/Application/components/NewCommentBox/NewCommentBox.hooks.tsx';
import {
  InputError,
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
    <Form>
      <textarea
        id={'commentContent'}
        name={'commentContent'}
        rows={5}
        cols={35}
      ></textarea>
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
