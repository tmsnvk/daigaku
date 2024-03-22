import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  useCheckFieldDisableStatus,
  useSubmitNewApplicationForm,
} from './NewApplicationForm.hooks.tsx';
import {
  ErrorMessage,
  InputInfoBox,
  LoadingIndicator,
  SubmitInput,
} from '@components/shared/form';
import { GenericTitle } from '@components/shared/general';
import {
  GeneralInputField,
  SelectCountry,
  SelectUniversity,
} from '@components/shared/field-implementations';
import { FeedbackModal } from '@components/shared/modal';
import { FormGridContainer } from './NewApplicationForm.styles.ts';
import { CountriesT } from '@hooks/useGetCountryOptions.tsx';
import { UniversitiesT } from '@hooks/useGetUniversityOptions.tsx';
import { NewApplicationFormFieldsT } from './NewApplicationForm.types.ts';
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
  onCountryClick: (event: string) => void;
  countryData: CountriesT[];
  universityData: UniversitiesT[];
}

const NewApplicationForm = ({ onCountryClick, countryData, universityData }: ComponentPropsT) => {
  const { formState: { errors }, reset, handleSubmit, register, setError } = useForm<NewApplicationFormFieldsT>({ mode: 'onSubmit' });
  const { isPending, isSuccess, onSubmit } = useSubmitNewApplicationForm({ setError });
  const { isCountryNotSelected, setIsCountryNotSelected, handleCountrySelectionStatus } = useCheckFieldDisableStatus();

  useEffect(() => {
    if (isSuccess) {
      setIsCountryNotSelected(true);
      reset();
    }
  }, [isSuccess]);

  return (
    <>
      <FormGridContainer id={'newApplicationForm'} method={'POST'} onSubmit={handleSubmit(onSubmit)}>
        <GenericTitle content={'New Application Form'} />
        <InputInfoBox content={formInformation} />
        <SelectCountry
          register={register}
          fieldError={errors.country?.message}
          fieldId={'country'}
          defaultValue={''}
          isDisabled={isPending}
          data={countryData}
          onCountryClick={onCountryClick}
          handleCountrySelectionStatus={handleCountrySelectionStatus}
        />
        <InputInfoBox content={countryInformation} />
        <SelectUniversity
          register={register}
          fieldError={errors.university?.message}
          fieldId={'university'}
          defaultValue={''}
          isDisabled={isPending || isCountryNotSelected}
          data={universityData}
        />
        <InputInfoBox content={universityInformation} />
        <GeneralInputField
          register={register}
          validationPattern={/^[\sa-zA-z]+$/}
          validationError={'You may enter letter characters only.'}
          requiredError={'Providing the name of your selected course is required.'}
          fieldError={errors.majorSubject?.message}
          fieldId={'majorSubject'}
          label={'Course name'}
          type={'text'}
          placeholder={'Provide the course of your choice.'}
          defaultValue={''}
          isDisabled={isPending}
        />
        <InputInfoBox content={majorSubjectInformation} />
        <GeneralInputField
          register={register}
          validationPattern={/^[\sa-zA-z]+$/}
          validationError={'You may enter letter characters only.'}
          fieldError={errors.minorSubject?.message}
          fieldId={'minorSubject'}
          label={'Minor subject'}
          type={'text'}
          placeholder={'Provide your minor course.'}
          defaultValue={''}
          isDisabled={isPending}
        />
        <InputInfoBox content={minorSubjectInformation} />
        <GeneralInputField
          register={register}
          validationPattern={/\b[1-9]\b/}
          validationError={'You may enter numeric values only between 1 and 9.'}
          requiredError={'Providing the length of your selected course is required.'}
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
              <LoadingIndicator message={'Your application is being submitted.'} /> :
              <SubmitInput type={'submit'} value={'submit application'} disabled={isPending} />
          }
          {errors.root?.serverError && <ErrorMessage error={errors.root.serverError.message as string} />}
        </article>
      </FormGridContainer>
      <FeedbackModal
        isSubmitted={isSuccess}
        content={submissionConfirmation}
      />
    </>
  );
};

export default NewApplicationForm;
