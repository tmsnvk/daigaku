import { useForm } from 'react-hook-form';
import {
  UpdateApplicationFormFieldsT,
  useGetAllSelectOptions,
  useUpdateApplication,
} from './ApplicationForm.hooks.tsx';
import {
  FeedbackModal,
  GlobalErrorModal,
  GlobalLoadingModal,
} from '@components/shared/modal';
import {
  ApplicationFormGridContainer, ErrorMessage,
  InputInfoBox, LoadingIndicator, SubmitInput,
} from '@components/shared/form';
import { GenericTitle } from '@components/shared/general';
import {
  DisabledInputField,
  GeneralSelectInputField,
} from '@components/shared/field-implementations';
import { ApplicationT } from '@custom-types/ApplicationT.ts';
import {
  applicationStatusInformation,
  countryInformation,
  courseNameInformation,
  finalDestinationInformation,
  formInformation,
  interviewStatusInformation,
  minorSubjectInformation,
  programmeLengthInformation,
  responseStatusInformation,
  submissionConfirmation,
  universityInformation,
} from './ApplicationForm.utilities.ts';

type ComponentPropsT = {
  applicationData: ApplicationT;
  applicationId: string
}

const ApplicationForm = ({ applicationData, applicationId }: ComponentPropsT) => {
  const { options, isLoading, isError } = useGetAllSelectOptions();
  const { formState: { errors }, reset, handleSubmit, register, setError } = useForm<UpdateApplicationFormFieldsT>({ mode: 'onSubmit' });
  const { isPending, isSuccess, mutate } = useUpdateApplication({ setError, reset, applicationId });

  if (isLoading) {
    return <GlobalLoadingModal />;
  }

  if (isError) {
    return <GlobalErrorModal />;
  }

  return (
    <>
      <ApplicationFormGridContainer id={'updateApplicationForm'} method={'PUT'} onSubmit={handleSubmit((formData) => mutate(formData))}>
        <GenericTitle content={'Application Form'} />
        <InputInfoBox content={formInformation} />
        <DisabledInputField
          fieldId={'country'}
          label={'Country'}
          type={'text'}
          defaultValue={applicationData.country}
        />
        <InputInfoBox content={countryInformation} />
        <DisabledInputField
          fieldId={'university'}
          label={'University'}
          type={'text'}
          defaultValue={applicationData.university}
        />
        <InputInfoBox content={universityInformation} />
        <DisabledInputField
          fieldId={'courseName'}
          label={'Course Name'}
          type={'text'}
          defaultValue={applicationData.courseName}
        />
        <InputInfoBox content={courseNameInformation} />
        <DisabledInputField
          fieldId={'minorSubject'}
          label={'Minor Subject'}
          type={'text'}
          defaultValue={applicationData.minorSubject ?? '-'}
        />
        <InputInfoBox content={minorSubjectInformation} />
        <DisabledInputField
          fieldId={'programmeLength'}
          label={'Programme Length'}
          type={'number'}
          defaultValue={applicationData.programmeLength}
        />
        <InputInfoBox content={programmeLengthInformation} />
        <GeneralSelectInputField
          register={register}
          fieldError={errors.applicationStatus?.message}
          fieldId={'applicationStatus'}
          labelContent={'Application Status'}
          defaultOptionFieldContent={'Update the application\'s current status.'}
          defaultValue={applicationData.applicationStatus}
          options={options.applicationStatus?.data}
        />
        <InputInfoBox
          content={applicationStatusInformation}
        />
        <GeneralSelectInputField
          register={register}
          fieldError={errors.interviewStatus?.message}
          fieldId={'interviewStatus'}
          labelContent={'Interview Status'}
          defaultOptionFieldContent={'Update the application\'s interview status.'}
          defaultValue={applicationData.interviewStatus}
          options={options.interviewStatus?.data}
        />
        <InputInfoBox
          content={interviewStatusInformation}
        />
        <GeneralSelectInputField
          register={register}
          fieldError={errors.offerStatus?.message}
          fieldId={'offerStatus'}
          labelContent={'Offer Status'}
          defaultOptionFieldContent={'Update the university\'s decision.'}
          defaultValue={applicationData.offerStatus}
          options={options.offerStatus?.data}
        />
        <InputInfoBox
          content={responseStatusInformation}
        />
        <GeneralSelectInputField
          register={register}
          fieldError={errors.responseStatus?.message}
          fieldId={'responseStatus'}
          labelContent={'Response Status'}
          defaultOptionFieldContent={'Update your response status.'}
          defaultValue={applicationData.responseStatus}
          options={options.responseStatus?.data}
        />
        <InputInfoBox
          content={responseStatusInformation}
        />
        <GeneralSelectInputField
          register={register}
          fieldError={errors.finalDestinationStatus?.message}
          fieldId={'finalDestinationStatus'}
          labelContent={'Final Destination Status'}
          defaultOptionFieldContent={'Update your final decision regarding this application.'}
          defaultValue={applicationData.finalDestinationStatus}
          options={options.finalDestinationStatus?.data}
        />
        <InputInfoBox
          content={finalDestinationInformation}
        />
        <article>
          {
            isPending ?
              <LoadingIndicator content={'Your application is being updated.'} /> :
              <SubmitInput type={'submit'} value={'update application'} disabled={isPending} />
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

export default ApplicationForm;
