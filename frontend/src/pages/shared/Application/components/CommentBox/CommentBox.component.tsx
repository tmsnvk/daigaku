import { Form } from './CommentBox.styles.ts';
import { useForm } from 'react-hook-form';
import {
  NewCommentFormFieldsT,
  useSubmitNewComment,
} from '@pages/shared/Application/components/CommentBox/CommentBox.hooks.tsx';

type ComponentPropsT = {
  applicationUuid: string;
}

const RootCommentBox = ({ applicationUuid }: ComponentPropsT) => {
  const { formState: { errors }, handleSubmit, register, setError } = useForm<NewCommentFormFieldsT>({ mode: 'onSubmit' });
  const { mutate } = useSubmitNewComment({ setError, applicationUuid });

  return (
    <Form>
      FORM
    </Form>
  );
};

export default RootCommentBox;
