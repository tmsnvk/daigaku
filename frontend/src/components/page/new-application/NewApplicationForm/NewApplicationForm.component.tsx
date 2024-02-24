import { useForm } from 'react-hook-form';
import {
  useCheckFieldDisableStatus,
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
import { CountriesT } from '@hooks/useGetCountries.tsx';
import { UniversitiesT } from '@hooks/useGetUniversities.tsx';
import { NewApplicationFormFieldsT } from './NewApplicationForm.types.ts';
import {
  countryInformation,
  courseNameInformation,
  universityInformation,
} from './NewApplicationForm.utilities.ts';

type ComponentPropsT = {
  onCountryClick: (event: string) => void;
  countryData: CountriesT[];
  universityData: UniversitiesT[];
}

const NewApplicationForm = ({ onCountryClick, countryData, universityData }: ComponentPropsT) => {
  const { formState: { errors }, handleSubmit, register, setError } = useForm<NewApplicationFormFieldsT>({ mode: 'onSubmit' });
  const { isPending, onSubmit } = useSubmitNewApplicationForm({ setError });
  const { isCountrySelected, handleCountrySelectionStatus } = useCheckFieldDisableStatus();

  return (
    <FormGridContainer id={'newApplicationForm'} method={'POST'} onSubmit={handleSubmit(onSubmit)}>
      <section>
        <InputFieldStyles $isError={errors.country?.message !== undefined}>
          <InputLabel inputId={'country'} content={'Country'} />
          <select
            {...register('country', {
              required: { value: true, message: 'Selecting a country is required.' },
            })}
            id={'country'}
            name={'country'}
            autoComplete={'off'}
            disabled={isPending}
            onChange={(event) => {
              onCountryClick(event.target.value);
              handleCountrySelectionStatus();
            }}
          >
            <option hidden value={''}>Select the country of your choice</option>
            {countryData.map((option: CountriesT) => {
              return (
                <option
                  key={option.uuid}
                  value={option.uuid}
                >
                  {option.name}
                </option>
              );
            })}
          </select>
          {errors.country?.message && <ErrorMessage error={errors.country.message}/>}
        </InputFieldStyles>
      </section>
      <InputInfoBox>
        <p>
          {countryInformation}
        </p>
      </InputInfoBox>
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
            disabled={isPending || isCountrySelected}
          >
            <option hidden>Select the university of your choice</option>
            {universityData.map((option: UniversitiesT) => {
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
          <InputLabel inputId={'courseName'} content={'Course Name'} />
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

// fields to add
// details - country, university, major subject, minor subject if applicable, program length
// status
//    application - planned submitted, withdrawn
//    interview - n/a interview, invited for interview, not invited for interview
//    offer - conditional, deferred, unconditional, rejected
//    response - firm choice, insurance choice, offer declined
//    final destination - final destination, final destination (deferred entry), not final destination, offer conditions not met
// comments
