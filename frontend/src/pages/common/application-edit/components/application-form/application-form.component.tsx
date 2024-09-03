/**
 * @prettier
 */

/* external imports */
import { useForm } from 'react-hook-form';

/* logic imports */
import {
  HandleFormSubmissionHook,
  UpdateApplicationFormFields,
  useHandleFieldDisableStatuses,
  useHandleFormSubmission,
  useUpdateApplication,
} from './application-form.hooks';

/* component, style imports */
import { ApplicationMetaData } from '@components/application';
import { DisabledInputField, InputError, InputFieldGuideText, SubmitInput } from '@components/form';
import { LoadingIndicator, PageTitle } from '@components/general';
import { Toast } from '@components/notification';
import { ActiveSelectField } from '../active-select-field/index';
import { IsRemovableButton } from '../is-removable-button/index';
import { Form } from './application-form.styles';

/* utilities imports */
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

/* interface, type, enum imports */
import { Application } from '@common-types';
import { ApplicationStatusOption } from '@hooks/application-status/use-get-all-select-options';
import { ApplicationStatus } from '@services/status/application-status.service';
import { FinalDestinationStatus } from '@services/status/final-destination-status.service';
import { InterviewStatus } from '@services/status/interview-status-service.service';
import { OfferStatus } from '@services/status/offer-status.service';
import { ResponseStatus } from '@services/status/response-status.service';

/* interfaces, types, enums */
interface ComponentProps {
  readonly application: Application;
  readonly selectOptions: ApplicationStatusOption;
}

/*
 * component - TODO - add functionality description
 */
export const ApplicationForm = ({ application, selectOptions }: ComponentProps) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<UpdateApplicationFormFields>({ mode: 'onSubmit' });
  const { data: updatedData, isPending, isSuccess, mutate } = useUpdateApplication({ setError, applicationUuid: application.uuid });
  const {
    fieldsReadOnlyStatus,
    updateInterviewStatus,
    updateOfferStatus,
    updateResponseStatus,
    updateFinalDestinationStatus,
    disableFieldsOnFinalDestinationUpdate,
  } = useHandleFieldDisableStatuses({ application, updatedData, selectOptions });
  const { submitForm }: HandleFormSubmissionHook = useHandleFormSubmission();

  return (
    <>
      <Form
        id={'updateApplicationForm'}
        method={'PATCH'}
        onSubmit={handleSubmit((formData) => submitForm({ formData, applicationUuid: application.uuid, mutate, setError }))}
      >
        <PageTitle content={'Update Application Form'} />
        <ApplicationMetaData
          createdAt={updatedData?.createdAt ?? application.createdAt}
          createdBy={updatedData?.createdBy ?? application.createdBy}
          lastUpdatedAt={updatedData ? updatedData.lastUpdatedAt : application.lastUpdatedAt}
          lastModifiedBy={updatedData?.lastModifiedBy ?? application.lastModifiedBy}
        />
        <IsRemovableButton
          isRemovable={updatedData?.isRemovable ?? application.isRemovable}
          applicationUuid={application.uuid}
        />
        <InputFieldGuideText content={formInformation} />
        <DisabledInputField
          fieldId={'country'}
          label={'Country'}
          type={'text'}
          defaultValue={application.country}
        />
        <InputFieldGuideText content={countryInformation} />
        <DisabledInputField
          fieldId={'university'}
          label={'University'}
          type={'text'}
          defaultValue={application.university}
        />
        <InputFieldGuideText content={universityInformation} />
        <DisabledInputField
          fieldId={'courseName'}
          label={'Course Name'}
          type={'text'}
          defaultValue={application.courseName}
        />
        <InputFieldGuideText content={courseNameInformation} />
        <DisabledInputField
          fieldId={'minorSubject'}
          label={'Minor Subject'}
          type={'text'}
          defaultValue={application.minorSubject ?? '-'}
        />
        <InputFieldGuideText content={minorSubjectInformation} />
        <DisabledInputField
          fieldId={'programmeLength'}
          label={'Programme Length'}
          type={'number'}
          defaultValue={application.programmeLength}
        />
        <InputFieldGuideText content={programmeLengthInformation} />
        <ActiveSelectField
          register={register}
          fieldError={errors.applicationStatusUuid?.message}
          fieldId={'applicationStatusUuid'}
          labelContent={'Application Status'}
          selectPrompt={"Update the application's current status."}
          previouslySelectedValue={updatedData?.applicationStatus ?? application.applicationStatus}
          options={selectOptions.applicationStatus as ApplicationStatus[]}
          isReadOnly={fieldsReadOnlyStatus.isApplicationStatusReadOnly}
          onFieldUpdate={updateInterviewStatus}
        />
        <InputFieldGuideText content={applicationStatusInformation} />
        <ActiveSelectField
          register={register}
          fieldError={errors.interviewStatusUuid?.message}
          fieldId={'interviewStatusUuid'}
          labelContent={'Interview Status'}
          selectPrompt={"Update the application's interview status."}
          previouslySelectedValue={updatedData?.interviewStatus ?? application.interviewStatus}
          options={selectOptions.interviewStatus as InterviewStatus[]}
          isReadOnly={fieldsReadOnlyStatus.isInterviewStatusReadOnly}
          onFieldUpdate={updateOfferStatus}
        />
        <InputFieldGuideText content={interviewStatusInformation} />
        <ActiveSelectField
          register={register}
          fieldError={errors.offerStatusUuid?.message}
          fieldId={'offerStatusUuid'}
          labelContent={'Offer Status'}
          selectPrompt={"Update the university's decision."}
          previouslySelectedValue={updatedData?.offerStatus ?? application.offerStatus}
          options={selectOptions.offerStatus as OfferStatus[]}
          isReadOnly={fieldsReadOnlyStatus.isOfferStatusReadOnly}
          onFieldUpdate={updateResponseStatus}
        />
        <InputFieldGuideText content={offerStatusInformation} />
        <ActiveSelectField
          register={register}
          fieldError={errors.responseStatusUuid?.message}
          fieldId={'responseStatusUuid'}
          labelContent={'Response Status'}
          selectPrompt={'Update your response status.'}
          previouslySelectedValue={updatedData?.responseStatus ?? application.responseStatus}
          options={selectOptions.responseStatus as ResponseStatus[]}
          isReadOnly={fieldsReadOnlyStatus.isResponseStatusReadOnly}
          onFieldUpdate={updateFinalDestinationStatus}
        />
        <InputFieldGuideText content={responseStatusInformation} />
        <ActiveSelectField
          register={register}
          fieldError={errors.finalDestinationStatusUuid?.message}
          fieldId={'finalDestinationStatusUuid'}
          labelContent={'Final Destination Status'}
          selectPrompt={'Update your final decision regarding this application.'}
          previouslySelectedValue={updatedData?.finalDestinationStatus ?? application.finalDestinationStatus}
          options={selectOptions.finalDestinationStatus as FinalDestinationStatus[]}
          isReadOnly={fieldsReadOnlyStatus.isFinalDestinationStatusReadOnly}
          onFieldUpdate={disableFieldsOnFinalDestinationUpdate}
        />
        <InputFieldGuideText content={finalDestinationInformation} />
        <article>
          {isPending ? (
            <LoadingIndicator loadingText={'Your application is being updated.'} />
          ) : (
            <SubmitInput
              type={'submit'}
              value={'update application'}
              disabled={isPending}
            />
          )}
        </article>
        <article>{errors.root?.serverError && <InputError errorText={errors.root.serverError.message as string} />}</article>
      </Form>
      <Toast
        isVisible={isSuccess}
        message={submissionConfirmation}
      />
    </>
  );
};
