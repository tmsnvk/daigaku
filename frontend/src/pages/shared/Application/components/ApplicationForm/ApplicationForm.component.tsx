import { useForm } from 'react-hook-form';
import {
  UpdateApplicationFormFieldsT,
  useGetAllSelectOptions,
  useHandleFieldDisableStatuses,
  useHandleFormSubmission,
  useUpdateApplication,
} from './ApplicationForm.hooks.tsx';
import {
  GlobalErrorModal,
  GlobalLoadingModal,
  Toast,
} from '@components/notification';
import {
  FormMetaData,
  InputError,
  InputInfoBox,
  LoadingIndicator,
  SubmitInput,
} from '@components/form';
import { PageTitle } from '@components/general';
import { DisabledInputField } from '@components/field-implementations';
import MarkedForDeletion from '../MarkedForDeletion';
import SelectField from '../SelectField';
import { FormContainer } from './ApplicationForm.styles.ts';
import {
  applicationStatusInformation,
  countryInformation,
  courseNameInformation,
  finalDestinationInformation,
  formInformation,
  interviewStatusInformation,
  minorSubjectInformation,
  offerStatusInformation,
  programmeLengthInformation,
  responseStatusInformation,
  submissionConfirmation,
  universityInformation,
} from './ApplicationForm.utilities.ts';
import { ApplicationT } from '@services/application/application.service.ts';
import { FinalDestinationStatusT } from '@services/application/finalDestinationStatus.service.ts';
import { ResponseStatusT } from '@services/application/responseStatus.service.ts';
import { OfferStatusT } from '@services/application/offerStatus.service.ts';
import { InterviewStatusT } from '@services/application/interviewStatusService.service.ts';
import { ApplicationStatusT } from '@services/application/applicationStatus.service.ts';

type ComponentPropsT = {
  currentApplicationData: ApplicationT;
  applicationUuid: string;
}

const ApplicationForm = ({ currentApplicationData, applicationUuid }: ComponentPropsT) => {
  const { options, isLoading, isError } = useGetAllSelectOptions();
  const { formState: { errors }, reset, handleSubmit, register, setError } = useForm<UpdateApplicationFormFieldsT>({ mode: 'onSubmit' });
  const { data: updatedData, isPending, isSuccess, mutate, error } = useUpdateApplication({ setError, reset, applicationUuid });
  const { fieldDisabledStatuses, updateInterviewStatus } = useHandleFieldDisableStatuses({ currentApplicationData, updatedData, options });
  const { submitForm } = useHandleFormSubmission();

  if (isLoading) {
    return <GlobalLoadingModal />;
  }

  if (isError) {
    return <GlobalErrorModal error={error?.response.data.root as string} />;
  }

  return (
    <>
      <FormContainer
        id={'updateApplicationForm'}
        method={'PATCH'}
        onSubmit={handleSubmit((formData) => submitForm({ formData, applicationUuid, mutate, setError }))}
      >
        <PageTitle content={'Update Application Form'} />
        <FormMetaData
          createdAt={updatedData?.createdAt ?? currentApplicationData.createdAt}
          createdBy={updatedData?.createdBy ?? currentApplicationData.createdBy}
          lastUpdatedAt={updatedData ? updatedData.lastUpdatedAt : currentApplicationData.lastUpdatedAt}
          lastModifiedBy={updatedData?.lastModifiedBy ?? currentApplicationData.lastModifiedBy}
        />
        <MarkedForDeletion
          isMarked={updatedData?.isMarkedForDeletion ?? currentApplicationData.isMarkedForDeletion}
          applicationUuid={applicationUuid}
        />
        <InputInfoBox content={formInformation} />
        <DisabledInputField
          fieldId={'country'}
          label={'Country'}
          type={'text'}
          defaultValue={currentApplicationData.country}
        />
        <InputInfoBox content={countryInformation} />
        <DisabledInputField
          fieldId={'university'}
          label={'University'}
          type={'text'}
          defaultValue={currentApplicationData.university}
        />
        <InputInfoBox content={universityInformation} />
        <DisabledInputField
          fieldId={'courseName'}
          label={'Course Name'}
          type={'text'}
          defaultValue={currentApplicationData.courseName}
        />
        <InputInfoBox content={courseNameInformation} />
        <DisabledInputField
          fieldId={'minorSubject'}
          label={'Minor Subject'}
          type={'text'}
          defaultValue={currentApplicationData.minorSubject ?? '-'}
        />
        <InputInfoBox content={minorSubjectInformation} />
        <DisabledInputField
          fieldId={'programmeLength'}
          label={'Programme Length'}
          type={'number'}
          defaultValue={currentApplicationData.programmeLength}
        />
        <InputInfoBox content={programmeLengthInformation} />
        <SelectField
          register={register}
          fieldError={errors.applicationStatusUuid?.message}
          fieldId={'applicationStatusUuid'}
          labelContent={'Application Status'}
          defaultOptionFieldContent={'Update the application\'s current status.'}
          defaultValue={updatedData?.applicationStatus ?? currentApplicationData.applicationStatus}
          options={options.applicationStatus as ApplicationStatusT[]}
          isDisabled={false}
          onFieldUpdate={updateInterviewStatus}
        />
        <InputInfoBox content={applicationStatusInformation} />
        <SelectField
          register={register}
          fieldError={errors.interviewStatusUuid?.message}
          fieldId={'interviewStatusUuid'}
          labelContent={'Interview Status'}
          defaultOptionFieldContent={'Update the application\'s interview status.'}
          defaultValue={updatedData?.interviewStatus ?? currentApplicationData.interviewStatus}
          options={options.interviewStatus as InterviewStatusT[]}
          isDisabled={fieldDisabledStatuses.interviewStatus}
          onFieldUpdate={() => console.log('a')}
        />
        <InputInfoBox content={interviewStatusInformation} />
        <SelectField
          register={register}
          fieldError={errors.offerStatusUuid?.message}
          fieldId={'offerStatusUuid'}
          labelContent={'Offer Status'}
          defaultOptionFieldContent={'Update the university\'s decision.'}
          defaultValue={updatedData?.offerStatus ?? currentApplicationData.offerStatus}
          options={options.offerStatus as OfferStatusT[]}
          isDisabled={false}
          onFieldUpdate={() => console.log('a')}
        />
        <InputInfoBox content={offerStatusInformation} />
        <SelectField
          register={register}
          fieldError={errors.responseStatusUuid?.message}
          fieldId={'responseStatusUuid'}
          labelContent={'Response Status'}
          defaultOptionFieldContent={'Update your response status.'}
          defaultValue={updatedData?.responseStatus ?? currentApplicationData.responseStatus}
          options={options.responseStatus as ResponseStatusT[]}
          isDisabled={false}
          onFieldUpdate={() => console.log('a')}
        />
        <InputInfoBox content={responseStatusInformation} />
        <SelectField
          register={register}
          fieldError={errors.finalDestinationStatusUuid?.message}
          fieldId={'finalDestinationStatusUuid'}
          labelContent={'Final Destination Status'}
          defaultOptionFieldContent={'Update your final decision regarding this application.'}
          defaultValue={updatedData?.finalDestinationStatus ?? currentApplicationData.finalDestinationStatus}
          options={options.finalDestinationStatus as FinalDestinationStatusT[]}
          isDisabled={false}
          onFieldUpdate={() => console.log('a')}
        />
        <InputInfoBox content={finalDestinationInformation} />
        <article>
          {
            isPending ?
              <LoadingIndicator content={'Your application is being updated.'} /> :
              <SubmitInput type={'submit'} value={'update application'} disabled={isPending} />
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

export default ApplicationForm;
