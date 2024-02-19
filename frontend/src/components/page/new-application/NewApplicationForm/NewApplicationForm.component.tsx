import { useForm } from 'react-hook-form';
import { useSubmitNewApplicationForm } from './NewApplicationForm.hooks.tsx';
import {
  ErrorMessage,
  InputFieldStyles,
  InputLabel,
} from '@components/shared/form';
import { FormGridContainer } from './NewApplicationForm.styles.ts';
import { NewApplicationFormFieldsT } from './NewApplicationForm.types.ts';

const NewApplicationForm = () => {
  const { formState: { errors }, handleSubmit, register, setError } = useForm<NewApplicationFormFieldsT>({ mode: 'onSubmit' });
  const { isPending, onSubmit } = useSubmitNewApplicationForm({ setError });

  return (
    <FormGridContainer id={'newApplicationForm'} method={'POST'} onSubmit={handleSubmit(onSubmit)}>
      <section>
        <InputFieldStyles $isError={errors.university?.message !== undefined}>
          <InputLabel
            inputId={'university'}
            content={'University'}
          />
          <input
            {...register('university', {
              required: { value: true, message: 'Selecting a university is required.' },
            })}
            type={'text'}
            id={'university'}
            name={'university'}
            autoComplete={'off'}
            placeholder={'Select the university from the list.'}
            disabled={isPending}
          />
          {errors.university?.message && <ErrorMessage error={errors.university.message} />}
        </InputFieldStyles>
      </section>
      <section>
        Dummy info about the input field in the same row.
      </section>
      <section>
        ROW 3
      </section>
      <section>
        ROW 4
      </section>
    </FormGridContainer>
  );
};

export default NewApplicationForm;
