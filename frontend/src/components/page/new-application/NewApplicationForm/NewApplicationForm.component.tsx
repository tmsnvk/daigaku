import { useForm } from 'react-hook-form';
import {
  useGetUniversities,
  useSubmitNewApplicationForm,
} from './NewApplicationForm.hooks.tsx';
import {
  ErrorMessage,
  InputFieldStyles,
  InputLabel,
} from '@components/shared/form';
import {
  FormGridContainer,
  InputInfoBox,
} from './NewApplicationForm.styles.ts';
import {
  NewApplicationFormFieldsT,
  UniversitiesT,
} from './NewApplicationForm.types.ts';
import {
  courseNameInformation,
  universityInformation,
} from './NewApplicationForm.utilities.ts';

const NewApplicationForm = () => {
  const { data, isLoading, isError } = useGetUniversities();
  const { formState: { errors }, handleSubmit, register, setError } = useForm<NewApplicationFormFieldsT>({ mode: 'onSubmit' });
  const { isPending, onSubmit } = useSubmitNewApplicationForm({ setError });

  return (
    <FormGridContainer id={'newApplicationForm'} method={'POST'} onSubmit={handleSubmit(onSubmit)}>
      <section>
        <InputFieldStyles $isError={errors.university?.message !== undefined}>
          <InputLabel inputId={'university'} content={'University'} />
          <select
            {...register('university', {
              required: { value: true, message: 'Selecting a university is required.' },
            })}
            id={'university'}
            name={'university'}
            autoComplete={'off'}
            disabled={isPending}
          >
            <option hidden>Select the university of your choice</option>
            {data && data.map((option: UniversitiesT) => {
              return (
                <option
                  key={option.uuid}
                  value={option.name}
                >
                  {`${option.name} - ${option.abbreviation}`}
                </option>
              );
            })}
          </select>
          {errors.university?.message && <ErrorMessage error={errors.university.message} />}
        </InputFieldStyles>
      </section>
      <InputInfoBox>
        <p>
          {universityInformation}
        </p>
      </InputInfoBox>
      <section>
        <InputFieldStyles $isError={errors.courseName?.message !== undefined}>
          <InputLabel
            inputId={'courseName'}
            content={'Course Name'}
          />
          <input
            {...register('courseName', {
              required: { value: true, message: 'Providing the name of your selected course is required.' },
            })}
            type={'text'}
            id={'courseName'}
            name={'courseName'}
            autoComplete={'off'}
            placeholder={'Provide the course of your choice.'}
            disabled={isPending}
          />
          {errors.courseName?.message && <ErrorMessage error={errors.courseName.message} />}
        </InputFieldStyles>
      </section>
      <InputInfoBox>
        <p>
          {courseNameInformation}
        </p>
      </InputInfoBox>
    </FormGridContainer>
  );
};

export default NewApplicationForm;
