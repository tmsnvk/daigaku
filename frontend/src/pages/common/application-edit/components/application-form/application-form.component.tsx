/**
 * @prettier
 */

import { useForm } from 'react-hook-form';

import {
  HandleFormSubmissionHook,
  UpdateApplicationFormFields,
  useHandleFieldDisableStatuses,
  useHandleFormSubmission,
  useUpdateApplication,
} from './application-form.hooks';

import { InputError, InputInfoBox, SubmitInput } from '@components/form';
import { Toast } from '@components/notification';
import { LoadingIndicator, PageTitle } from '@components/general';
import { DisabledInputField } from '@components/input-implementations';
import { ApplicationMetaData } from '@components/application';
import { IsRemovableButton } from '../is-removable-button/index';
import { ActiveSelectField } from '../active-select-field/index';
import { Form } from './application-form.styles';

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
} from './application-form.utilities';

import { ApplicationStatusOption } from '@hooks/application-status/use-get-all-select-options';
import { Application } from '@common-types/index';
import { FinalDestinationStatus } from '@services/status/final-destination-status.service';
import { ResponseStatus } from '@services/status/response-status.service';
import { OfferStatus } from '@services/status/offer-status.service';
import { InterviewStatus } from '@services/status/interview-status-service.service';
import { ApplicationStatus } from '@services/status/application-status.service';

interface ComponentProps {
  readonly currentApplicationData: Application;
  readonly applicationUuid: string;
  readonly selectOptions: ApplicationStatusOption;
}

export const ApplicationForm = ({ currentApplicationData, applicationUuid, selectOptions }: ComponentProps) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<UpdateApplicationFormFields>({ mode: 'onSubmit' });

  const { data: updatedData, isPending, isSuccess, mutate } = useUpdateApplication({ setError, applicationUuid });

  const {
    fieldDisabledStatuses,
    updateInterviewStatus,
    updateOfferStatus,
    updateResponseStatus,
    updateFinalDestinationStatus,
    disableFieldsOnFinalDestinationUpdate,
  } = useHandleFieldDisableStatuses({ currentApplicationData, updatedData, selectOptions });

  const { submitForm }: HandleFormSubmissionHook = useHandleFormSubmission();

  return (
    <>
      <Form
        id={'updateApplicationForm'}
        method={'PATCH'}
        onSubmit={handleSubmit((formData) => submitForm({ formData, applicationUuid, mutate, setError }))}
      >
        <PageTitle content={'Update Application Form'} />
        <ApplicationMetaData
          createdAt={updatedData?.createdAt ?? currentApplicationData.createdAt}
          createdBy={updatedData?.createdBy ?? currentApplicationData.createdBy}
          lastUpdatedAt={updatedData ? updatedData.lastUpdatedAt : currentApplicationData.lastUpdatedAt}
          lastModifiedBy={updatedData?.lastModifiedBy ?? currentApplicationData.lastModifiedBy}
        />
        <IsRemovableButton
          isRemovable={updatedData?.isRemovable ?? currentApplicationData.isRemovable}
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
          selectPrompt={"Update the application's current status."}
          previouslySelectedValue={updatedData?.applicationStatus ?? currentApplicationData.applicationStatus}
          options={selectOptions.applicationStatus as ApplicationStatus[]}
          isReadOnly={fieldDisabledStatuses.applicationStatus}
          onFieldUpdate={updateInterviewStatus}
        />
        <InputInfoBox content={applicationStatusInformation} />
        <ActiveSelectField
          register={register}
          fieldError={errors.interviewStatusUuid?.message}
          fieldId={'interviewStatusUuid'}
          labelContent={'Interview Status'}
          selectPrompt={"Update the application's interview status."}
          previouslySelectedValue={updatedData?.interviewStatus ?? currentApplicationData.interviewStatus}
          options={selectOptions.interviewStatus as InterviewStatus[]}
          isReadOnly={fieldDisabledStatuses.interviewStatus}
          onFieldUpdate={updateOfferStatus}
        />
        <InputInfoBox content={interviewStatusInformation} />
        <ActiveSelectField
          register={register}
          fieldError={errors.offerStatusUuid?.message}
          fieldId={'offerStatusUuid'}
          labelContent={'Offer Status'}
          selectPrompt={"Update the university's decision."}
          previouslySelectedValue={updatedData?.offerStatus ?? currentApplicationData.offerStatus}
          options={selectOptions.offerStatus as OfferStatus[]}
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
          options={selectOptions.responseStatus as ResponseStatus[]}
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
          options={selectOptions.finalDestinationStatus as FinalDestinationStatus[]}
          isReadOnly={fieldDisabledStatuses.finalDestinationStatus}
          onFieldUpdate={disableFieldsOnFinalDestinationUpdate}
        />
        <InputInfoBox content={finalDestinationInformation} />
        <article>
          {isPending ?
            (
              <LoadingIndicator content={'Your application is being updated.'} />
            ) :
            (
              <SubmitInput
                type={'submit'}
                value={'update application'}
                disabled={isPending}
              />
            )}
        </article>
        <article>{errors.root?.serverError && <InputError content={errors.root.serverError.message as string} />}</article>
      </Form>
      <Toast
        isVisible={isSuccess}
        content={submissionConfirmation}
      />
    </>
  );
};
