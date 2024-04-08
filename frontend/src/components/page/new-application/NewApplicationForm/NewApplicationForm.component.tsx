import { useForm } from 'react-hook-form';
import {
  NewApplicationFormFieldsT,
  useCheckFieldDisableStatus,
  useSubmitNewApplicationForm,
} from './NewApplicationForm.hooks.tsx';
import {
  ApplicationFormGridContainer,
  ErrorMessage,
  InputInfoBox,
  LoadingIndicator,
  SubmitInput,
} from '@components/shared/form';
import { PageTitle } from '@components/shared/general';
import {
  GeneralInputField,
  SelectCountry,
  SelectUniversity,
} from '@components/shared/field-implementations';
import { FeedbackModal } from '@components/shared/modal';
import { CountryOptionT } from '@services/country/Country.service.ts';
import { UniversityOptionT } from '@services/university/University.service.ts';
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
  countryData: CountryOptionT[];
  universityData: UniversityOptionT[];
}

const NewApplicationForm = ({ onCountryClick, countryData, universityData }: ComponentPropsT) => {
  const { formState: { errors }, reset, handleSubmit, register, setError } = useForm<NewApplicationFormFieldsT>({ mode: 'onSubmit' });
  const { isCountryNotSelected, handleCountrySelectionStatus, resetCountryField } = useCheckFieldDisableStatus();
  const { isPending, isSuccess, mutate } = useSubmitNewApplicationForm({ setError, resetCountryField, reset });

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
          fieldError={errors.country?.message}
          fieldId={'country'}
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
          isDisabled={isPending || isCountryNotSelected}
          data={universityData}
        />
        <InputInfoBox content={universityInformation} />
        <GeneralInputField
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
          labelContent={'Course name'}
          type={'text'}
          placeholder={'Provide the course of your choice.'}
          defaultValue={''}
          isDisabled={isPending}
        />
        <InputInfoBox content={majorSubjectInformation} />
        <GeneralInputField
          register={register}
          validationRules={{
            pattern: {
              value: /^[A-Za-z-\s]{5,255}$/,
              message: 'Providing a minor subject is optional but use only letters, spaces and a minimum of 5 and a maximum of 255 characters if you do so.',
            },
          }}
          fieldError={errors.minorSubject?.message}
          fieldId={'minorSubject'}
          labelContent={'Minor subject'}
          type={'text'}
          placeholder={'Provide your minor course.'}
          defaultValue={''}
          isDisabled={isPending}
        />
        <InputInfoBox content={minorSubjectInformation} />
        <GeneralInputField
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
          labelContent={'Programme length'}
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
          {errors.root?.serverError && <ErrorMessage content={errors.root.serverError.message as string} />}
        </article>
      </ApplicationFormGridContainer>
      <FeedbackModal
        isVisible={isSuccess}
        content={submissionConfirmation}
      />
    </>
  );
};

export default NewApplicationForm;
