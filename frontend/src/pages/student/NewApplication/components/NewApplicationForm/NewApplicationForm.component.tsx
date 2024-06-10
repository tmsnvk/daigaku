import { useForm } from 'react-hook-form';
import {
  NewApplicationFormFieldsT,
  useCheckFieldDisableStatus,
  useSubmitNewApplicationForm,
} from './NewApplicationForm.hooks.tsx';
import {
  InputError,
  InputInfoBox,
  LoadingIndicator,
  SubmitInput,
} from '@components/form';
import { PageTitle } from '@components/general';
import {
  GenericInputField,
  SelectCountry,
  SelectUniversity,
} from '@components/input-implementations';
import { Toast } from '@components/notification';
import { FormContainer } from './NewApplicationForm.styles.ts';
import { CountryOptionT } from '@services/support/country.service.ts';
import { UniversityOptionT } from '@services/support/university.service.ts';
import {
  countryInformation,
  formInformation,
  majorSubjectInformation,
  minorSubjectInformation,
  programmeLengthInformation,
  submissionConfirmation,
  universityInformation,
} from './NewApplicationForm.utilities.ts';

type ComponentPropsT = {
  handleCountryClick: (event: string) => void;
  countryData: CountryOptionT[];
  universityData: UniversityOptionT[];
  isUniversityDataLoading: boolean;
}

const NewApplicationForm = ({ handleCountryClick, countryData, universityData, isUniversityDataLoading }: ComponentPropsT) => {
  const { formState: { errors }, reset, handleSubmit, register, setError } = useForm<NewApplicationFormFieldsT>({ mode: 'onSubmit' });
  const { isCountrySelected, handleCountrySelection, resetCountrySelection } = useCheckFieldDisableStatus();
  const { isPending, isSuccess, mutate } = useSubmitNewApplicationForm({ setError, resetCountrySelection, reset });

  return (
    <>
      <FormContainer
        id={'newApplicationForm'}
        method={'POST'}
        onSubmit={handleSubmit((formData) => mutate(formData))}
      >
        <PageTitle content={'New Application Form'} />
        <InputInfoBox content={formInformation} />
        <SelectCountry
          register={register}
          fieldError={errors.countryUuid?.message}
          fieldId={'countryUuid'}
          isDisabled={isPending}
          data={countryData}
          onCountryClick={handleCountryClick}
          onCountrySelection={handleCountrySelection}
        />
        <InputInfoBox content={countryInformation} />
        {
          isUniversityDataLoading ?
            <LoadingIndicator content={'Fetching university list...'} /> :
            <SelectUniversity
              register={register}
              fieldError={errors.universityUuid?.message}
              fieldId={'universityUuid'}
              isDisabled={isPending || !isCountrySelected}
              data={universityData}
            />
        }
        <InputInfoBox content={universityInformation} />
        <GenericInputField
          register={register}
          validationRules={{
            required: {
              value: true,
              message: 'Providing the name of your selected course is required.',
            },
            pattern: {
              value: /^[\p{L}\s]{5,255}$/u,
              message: 'Use only letters and spaces. Provide a minimum of 5 and a maximum of 255 characters.',
            },
          }}
          fieldError={errors.courseName?.message}
          fieldId={'courseName'}
          label={'Course name'}
          type={'text'}
          placeholder={'Provide the course of your choice.'}
          isDisabled={isPending}
        />
        <InputInfoBox content={majorSubjectInformation} />
        <GenericInputField
          register={register}
          validationRules={{
            pattern: {
              value: /^[\p{L}\s]{5,255}$/u,
              message: 'Providing a minor subject is optional but use only letters, spaces and a minimum of 5 and a maximum of 255 characters if you do so.',
            },
          }}
          fieldError={errors.minorSubject?.message}
          fieldId={'minorSubject'}
          label={'Minor subject'}
          type={'text'}
          placeholder={'Provide your minor course.'}
          isDisabled={isPending}
        />
        <InputInfoBox content={minorSubjectInformation} />
        <GenericInputField
          register={register}
          validationRules={{
            required: {
              value: true,
              message: 'Providing the length of your selected course is required.',
            },
            pattern: {
              value: /^\b[2-5]\b$/,
              message: 'You may enter numeric values only between 2 and 5.',
            },
          }}
          fieldError={errors.programmeLength?.message}
          fieldId={'programmeLength'}
          label={'Programme length'}
          type={'number'}
          placeholder={'Provide the length of the course of your choice.'}
          defaultValue={3}
          isDisabled={isPending}
        />
        <InputInfoBox content={programmeLengthInformation} />
        <article>
          {
            isPending ?
              <LoadingIndicator content={'Your application is being submitted.'} /> :
              <SubmitInput type={'submit'} value={'submit application'} disabled={isPending} />
          }
        </article>
        <article>
          {errors.root?.serverError && <InputError content={errors.root.serverError.message as string} />}
        </article>
      </FormContainer>
      <Toast
        isVisible={isSuccess}
        content={submissionConfirmation}
      />
    </>
  );
};

export default NewApplicationForm;
