import { useForm } from 'react-hook-form';
import {
  UpdateApplicationFormFieldsT,
  useHandleFieldDisableStatuses,
  useHandleFormSubmission,
  useUpdateApplication,
} from './ApplicationForm.hooks.tsx';
import { Toast } from '@components/notification';
import {
  InputError,
  InputInfoBox,
  LoadingIndicator,
  SubmitInput,
} from '@components/form';
import { PageTitle } from '@components/general';
import { DisabledInputField } from '@components/field-implementations';
import FormMetaData from '../FormMetaData';
import MarkedForDeletion from '../MarkedForDeletion';
import ActiveSelectField from '../ActiveSelectField';
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
import { ApplicationOptionStatusesT } from '@hooks/applicationStatuses/useGetAllSelectOptions.tsx';
import { ApplicationT } from '@services/application/application.service.ts';
import { FinalDestinationStatusT } from '@services/status/finalDestinationStatus.service.ts';
import { ResponseStatusT } from '@services/status/responseStatus.service.ts';
import { OfferStatusT } from '@services/status/offerStatus.service.ts';
import { InterviewStatusT } from '@services/status/interviewStatusService.service.ts';
import { ApplicationStatusT } from '@services/status/applicationStatus.service.ts';

type ComponentPropsT = {
  currentApplicationData: ApplicationT;
  applicationUuid: string;
  selectOptions: ApplicationOptionStatusesT;
}

const ApplicationForm = ({ currentApplicationData, applicationUuid, selectOptions }: ComponentPropsT) => {
  const { formState: { errors }, handleSubmit, register, setError } = useForm<UpdateApplicationFormFieldsT>({ mode: 'onSubmit' });
  const { data: updatedData, isPending, isSuccess, mutate } = useUpdateApplication({ setError, applicationUuid });
  const {
    fieldDisabledStatuses,
    updateInterviewStatus,
    updateOfferStatus,
    updateResponseStatus,
    updateFinalDestinationStatus,
    disableFields,
  } = useHandleFieldDisableStatuses({ currentApplicationData, updatedData, selectOptions });
  const { submitForm } = useHandleFormSubmission();

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
          isMarked={updatedData?.isRemovable ?? currentApplicationData.isRemovable}
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
        <ActiveSelectField
          register={register}
          fieldError={errors.applicationStatusUuid?.message}
          fieldId={'applicationStatusUuid'}
          labelContent={'Application Status'}
          selectPrompt={'Update the application\'s current status.'}
          previouslySelectedValue={updatedData?.applicationStatus ?? currentApplicationData.applicationStatus}
          options={selectOptions.applicationStatus as ApplicationStatusT[]}
          isReadOnly={fieldDisabledStatuses.applicationStatus}
          onFieldUpdate={updateInterviewStatus}
        />
        <InputInfoBox content={applicationStatusInformation} />
        <ActiveSelectField
          register={register}
          fieldError={errors.interviewStatusUuid?.message}
          fieldId={'interviewStatusUuid'}
          labelContent={'Interview Status'}
          selectPrompt={'Update the application\'s interview status.'}
          previouslySelectedValue={updatedData?.interviewStatus ?? currentApplicationData.interviewStatus}
          options={selectOptions.interviewStatus as InterviewStatusT[]}
          isReadOnly={fieldDisabledStatuses.interviewStatus}
          onFieldUpdate={updateOfferStatus}
        />
        <InputInfoBox content={interviewStatusInformation} />
        <ActiveSelectField
          register={register}
          fieldError={errors.offerStatusUuid?.message}
          fieldId={'offerStatusUuid'}
          labelContent={'Offer Status'}
          selectPrompt={'Update the university\'s decision.'}
          previouslySelectedValue={updatedData?.offerStatus ?? currentApplicationData.offerStatus}
          options={selectOptions.offerStatus as OfferStatusT[]}
          isReadOnly={fieldDisabledStatuses.offerStatus}
          onFieldUpdate={updateResponseStatus}
        />
        <InputInfoBox content={offerStatusInformation} />
        <ActiveSelectField
          register={register}
          fieldError={errors.responseStatusUuid?.message}
          fieldId={'responseStatusUuid'}
          labelContent={'Response Status'}
          selectPrompt={'Update your response status.'}
          previouslySelectedValue={updatedData?.responseStatus ?? currentApplicationData.responseStatus}
          options={selectOptions.responseStatus as ResponseStatusT[]}
          isReadOnly={fieldDisabledStatuses.responseStatus}
          onFieldUpdate={updateFinalDestinationStatus}
        />
        <InputInfoBox content={responseStatusInformation} />
        <ActiveSelectField
          register={register}
          fieldError={errors.finalDestinationStatusUuid?.message}
          fieldId={'finalDestinationStatusUuid'}
          labelContent={'Final Destination Status'}
          selectPrompt={'Update your final decision regarding this application.'}
          previouslySelectedValue={updatedData?.finalDestinationStatus ?? currentApplicationData.finalDestinationStatus}
          options={selectOptions.finalDestinationStatus as FinalDestinationStatusT[]}
          isReadOnly={fieldDisabledStatuses.finalDestinationStatus}
          onFieldUpdate={disableFields}
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
