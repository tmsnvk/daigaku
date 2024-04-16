import { useForm } from 'react-hook-form';
import {
  NewApplicationFormFieldsT,
  useCheckFieldDisableStatus,
  useSubmitNewApplicationForm,
} from './NewApplicationForm.hooks.tsx';
import {
  ApplicationFormGridContainer,
  InputError,
  InputInfoBox,
  LoadingIndicator,
  SubmitInput,
} from '@components/shared/form';
import { PageTitle } from '@components/shared/general';
import {
  GenericInputField,
  SelectCountry,
  SelectUniversity,
} from '@components/shared/field-implementations';
import { Toast } from '@components/shared/notification';
import { CountryOptionT } from '@services/country/country.service.ts';
import { UniversityOptionT } from '@services/university/university.service.ts';
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
}

const NewApplicationForm = ({
  handleCountryClick,
  countryData,
  universityData,
}: ComponentPropsT) => {
  const {
    formState: { errors },
    reset, handleSubmit,
    register,
    setError,
  } = useForm<NewApplicationFormFieldsT>({ mode: 'onSubmit' });
  const {
    isCountrySelected,
    handleCountrySelection,
    resetCountrySelection,
  } = useCheckFieldDisableStatus();
  const {
    isPending,
    isSuccess,
    mutate,
  } = useSubmitNewApplicationForm({ setError, resetCountrySelection, reset });
  console.log(isSuccess);
  return (
    <>
      <ApplicationFormGridContainer
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
        <SelectUniversity
          register={register}
          fieldError={errors.universityUuid?.message}
          fieldId={'universityUuid'}
          isDisabled={isPending || !isCountrySelected}
          data={universityData}
        />
        <InputInfoBox content={universityInformation} />
        <GenericInputField
          register={register}
          validationRules={{
            required: {
              value: true,
              message: 'Providing the name of your selected course is required.',
            },
            pattern: {
              value: /^[A-Za-z-\s]{5,255}$/,
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
              value: /^[A-Za-z-\s]{5,255}$/,
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
          {errors.root?.serverError && <InputError content={errors.root.serverError.message as string} />}
        </article>
      </ApplicationFormGridContainer>
      <Toast
        isVisible={isSuccess}
        content={submissionConfirmation}
      />
    </>
  );
};

export default NewApplicationForm;
