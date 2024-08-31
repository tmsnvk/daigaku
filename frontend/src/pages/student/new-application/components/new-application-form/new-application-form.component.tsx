/**
 * @prettier
 */

/* external imports */
import { useForm } from 'react-hook-form';

/* logic imports */
import {
  CheckFieldDisableStatus,
  NewApplicationFormFields,
  SubmitNewApplicationForm,
  useCheckFieldDisableStatus,
  useSubmitNewApplicationForm,
} from './new-application-form.hooks';

/* component, style imports */
import { GenericInputField, InputError, InputFieldGuideText, SelectCountry, SelectUniversity, SubmitInput } from '@components/form';
import { LoadingIndicator, PageTitle } from '@components/general';
import { Toast } from '@components/notification';
import { FormContainer } from './new-application-form.styles';

/* utilities imports */
import {
  countryInformation,
  formInformation,
  majorSubjectInformation,
  minorSubjectInformation,
  programmeLengthInformation,
  submissionConfirmation,
  universityInformation,
} from './new-application-form.utilities';

/* interface, type, enum imports */
import { CountryOption } from '@services/support/country.service';
import { UniversityOption } from '@services/support/university.service';

/* interfaces, types, enums */
interface ComponentProps {
  readonly handleCountryClick: (event: string) => void;
  readonly countryData: CountryOption[];
  readonly universityData: UniversityOption[];
  readonly isUniversityDataLoading: boolean;
}

/*
 * component - TODO - add functionality description
 */
export const NewApplicationForm = ({ handleCountryClick, countryData, universityData, isUniversityDataLoading }: ComponentProps) => {
  const {
    formState: { errors },
    reset,
    handleSubmit,
    register,
    setError,
  } = useForm<NewApplicationFormFields>({ mode: 'onSubmit' });
  const { isCountrySelected, handleCountrySelection, resetCountrySelection }: CheckFieldDisableStatus = useCheckFieldDisableStatus();
  const { isPending, isSuccess, mutate }: SubmitNewApplicationForm = useSubmitNewApplicationForm({
    setError,
    resetCountrySelection,
    reset,
  });

  return (
    <>
      <FormContainer
        id={'newApplicationForm'}
        method={'POST'}
        onSubmit={handleSubmit((formData) => mutate(formData))}
      >
        <PageTitle content={'New Application Form'} />
        <InputFieldGuideText content={formInformation} />
        <SelectCountry
          register={register}
          fieldError={errors.countryUuid?.message}
          fieldId={'countryUuid'}
          isDisabled={isPending}
          countryOptions={countryData}
          onCountryClick={handleCountryClick}
          onCountrySelection={handleCountrySelection}
        />
        <InputFieldGuideText content={countryInformation} />
        {isUniversityDataLoading ? (
          <LoadingIndicator message={'Fetching university list...'} />
        ) : (
          <SelectUniversity
            register={register}
            fieldError={errors.universityUuid?.message}
            fieldId={'universityUuid'}
            isDisabled={isPending || !isCountrySelected}
            universityOptions={universityData}
          />
        )}
        <InputFieldGuideText content={universityInformation} />
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
        <InputFieldGuideText content={majorSubjectInformation} />
        <GenericInputField
          register={register}
          validationRules={{
            pattern: {
              value: /^[\p{L}\s]{5,255}$/u,
              message:
                'Providing a minor subject is optional but use only letters, spaces and a minimum of 5 and a maximum of 255 characters if you do so.',
            },
          }}
          fieldError={errors.minorSubject?.message}
          fieldId={'minorSubject'}
          label={'Minor subject'}
          type={'text'}
          placeholder={'Provide your minor course.'}
          isDisabled={isPending}
        />
        <InputFieldGuideText content={minorSubjectInformation} />
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
        <InputFieldGuideText content={programmeLengthInformation} />
        <article>
          {isPending ? (
            <LoadingIndicator message={'Your application is being submitted.'} />
          ) : (
            <SubmitInput
              type={'submit'}
              value={'submit application'}
              disabled={isPending}
            />
          )}
        </article>
        <article>{errors.root?.serverError && <InputError message={errors.root.serverError.message as string} />}</article>
      </FormContainer>
      <Toast
        isVisible={isSuccess}
        message={submissionConfirmation}
      />
    </>
  );
};
