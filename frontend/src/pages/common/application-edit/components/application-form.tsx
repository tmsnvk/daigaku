/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

/* logic imports */
import { useHandleFieldDisableStatus, useHandleFormSubmission, useUpdateApplicationFormMutation } from '../hooks';

/* component imports */
import {
  ApplicationStatusSelectGroup,
  CoreFormAction,
  CoreFormElementInstruction,
  CoreFormHeader,
  CoreFormWrapper,
  DisabledInputGroup,
} from '@daigaku/components/form';
import { ApplicationMetadata } from '@daigaku/components/general';
import { Toast } from '@daigaku/components/notification';
import { IsRemovableButton } from './is-removable-button';

/* configuration, utilities, constants imports */
import { localization as l } from '@daigaku/constants';
import { joinTw } from '@daigaku/utilities';

/* interface, type, enum imports */
import {
  ApplicationRecord,
  ApplicationRecordStatusOptions,
  ApplicationStatus,
  CoreSelectElementStyleIntent,
  CoreSubmitInputElementStyleIntent,
  FinalDestinationStatus,
  InterviewStatus,
  OfferStatus,
  ResponseStatus,
  UpdateApplicationRecordByStudentPayload,
} from '@daigaku/common-types';

/**
 * Defines the component's properties.
 */
interface ApplicationFormProps {
  /**
   * The application record.
   */
  readonly application: ApplicationRecord;

  /**
   * All available status select options.
   */
  readonly selectOptions: ApplicationRecordStatusOptions;
}

/**
 * Renders the form edit page where users are able to amend their application data.
 *
 * @return {JSX.Element}
 */
export const ApplicationForm = ({ application, selectOptions }: ApplicationFormProps): JSX.Element => {
  const methods = useForm<UpdateApplicationRecordByStudentPayload>({ mode: 'onSubmit' });
  const {
    formState: { errors },
    handleSubmit,
    setError,
  } = methods;

  const { submitForm } = useHandleFormSubmission();
  const {
    data: updatedData,
    isPending,
    isSuccess,
    mutate,
  } = useUpdateApplicationFormMutation(setError, application.uuid);
  const {
    onPageLoadValidation,
    fieldsReadOnlyStatus,
    updateInterviewStatus,
    updateOfferStatus,
    updateResponseStatus,
    updateFinalDestinationStatus,
  } = useHandleFieldDisableStatus(application, updatedData, selectOptions);

  useEffect(() => {
    onPageLoadValidation();
  }, []);

  return (
    <>
      <section className={joinTw('core-tertiary-border', 'w-9/10 md:w-8/10 2xl:max-w-[100rem]', 'my-[5%]')}>
        <FormProvider {...methods}>
          <CoreFormWrapper
            formId={'update-application-form'}
            onFormSubmit={handleSubmit((formData: UpdateApplicationRecordByStudentPayload) => {
              submitForm(formData, application.uuid, mutate, setError);
            })}
            className={joinTw('core-application-grid')}
          >
            <CoreFormHeader
              title={l.PAGES.COMMON.APPLICATION_EDIT.FORM.TITLE}
              intent={'largeWithUnderline'}
              className={joinTw('col-start-1 col-end-3')}
            />
            <ApplicationMetadata
              className={joinTw('col-start-1 col-end-2 row-start-2 row-end-3', 'h-40')}
              metadata={{
                created: {
                  createdAt: updatedData?.createdAt ?? application.createdAt,
                  createdBy: updatedData?.createdBy ?? application.createdBy,
                },
                lastUpdated: {
                  lastUpdatedAt: updatedData ? updatedData.lastUpdatedAt : application.lastUpdatedAt,
                  lastModifiedBy: updatedData?.lastModifiedBy ?? application.lastModifiedBy,
                },
              }}
            />
            <IsRemovableButton
              isRemovable={updatedData?.isRemovable ?? application.isRemovable}
              applicationUuid={application.uuid}
            />
            <CoreFormElementInstruction
              paragraphs={l.PAGES.COMMON.APPLICATION_EDIT.FORM.INFORMATION}
              className={joinTw('col-start-1 col-end-3', 'mt-20')}
            />
            <DisabledInputGroup
              id={'country'}
              type={'text'}
              label={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.COUNTRY.NAME}
              value={application.country}
            />
            <CoreFormElementInstruction paragraphs={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.COUNTRY.INFORMATION} />
            <DisabledInputGroup
              id={'university'}
              type={'text'}
              label={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.UNIVERSITY.NAME}
              value={application.university}
            />
            <CoreFormElementInstruction
              paragraphs={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.UNIVERSITY.INFORMATION}
            />
            <DisabledInputGroup
              id={'courseName'}
              type={'text'}
              label={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.COURSE_NAME.NAME}
              value={application.courseName}
            />
            <CoreFormElementInstruction
              paragraphs={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.COURSE_NAME.INFORMATION}
            />
            <DisabledInputGroup
              id={'minorSubject'}
              type={'text'}
              label={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.MINOR_SUBJECT.NAME}
              value={application.minorSubject ?? '-'}
            />
            <CoreFormElementInstruction
              paragraphs={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.MINOR_SUBJECT.INFORMATION}
            />
            <DisabledInputGroup
              id={'programmeLength'}
              type={'number'}
              label={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.PROGRAMME_LENGTH.NAME}
              value={application.programmeLength}
            />
            <CoreFormElementInstruction
              paragraphs={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.PROGRAMME_LENGTH.INFORMATION}
            />
            <ApplicationStatusSelectGroup
              id={'applicationStatusUuid'}
              label={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.APPLICATION_STATUS.NAME}
              selectPrompt={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.APPLICATION_STATUS.SELECT_PROMPT}
              previouslySelectedValue={updatedData?.applicationStatus ?? application.applicationStatus}
              options={selectOptions.applicationStatus as Array<ApplicationStatus>}
              isDisabled={fieldsReadOnlyStatus.isApplicationStatusReadOnly}
              onFieldUpdate={updateInterviewStatus}
              error={errors.applicationStatusUuid?.message}
              intent={CoreSelectElementStyleIntent.LIGHT}
            />
            <CoreFormElementInstruction
              paragraphs={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.APPLICATION_STATUS.INFORMATION}
            />
            <ApplicationStatusSelectGroup
              id={'interviewStatusUuid'}
              label={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.INTERVIEW_STATUS.NAME}
              selectPrompt={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.INTERVIEW_STATUS.SELECT_PROMPT}
              previouslySelectedValue={updatedData?.interviewStatus ?? application.interviewStatus}
              options={selectOptions.interviewStatus as Array<InterviewStatus>}
              isDisabled={fieldsReadOnlyStatus.isInterviewStatusReadOnly}
              onFieldUpdate={updateOfferStatus}
              error={errors.interviewStatusUuid?.message}
              intent={CoreSelectElementStyleIntent.LIGHT}
            />
            <CoreFormElementInstruction
              paragraphs={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.INTERVIEW_STATUS.INFORMATION}
            />
            <ApplicationStatusSelectGroup
              id={'offerStatusUuid'}
              label={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.OFFER_STATUS.NAME}
              selectPrompt={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.OFFER_STATUS.SELECT_PROMPT}
              previouslySelectedValue={updatedData?.offerStatus ?? application.offerStatus}
              options={selectOptions.offerStatus as Array<OfferStatus>}
              isDisabled={fieldsReadOnlyStatus.isOfferStatusReadOnly}
              onFieldUpdate={updateResponseStatus}
              error={errors.offerStatusUuid?.message}
              intent={CoreSelectElementStyleIntent.LIGHT}
            />
            <CoreFormElementInstruction
              paragraphs={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.OFFER_STATUS.INFORMATION}
            />
            <ApplicationStatusSelectGroup
              id={'responseStatusUuid'}
              label={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.RESPONSE_STATUS.NAME}
              selectPrompt={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.RESPONSE_STATUS.SELECT_PROMPT}
              previouslySelectedValue={updatedData?.responseStatus ?? application.responseStatus}
              options={selectOptions.responseStatus as Array<ResponseStatus>}
              isDisabled={fieldsReadOnlyStatus.isResponseStatusReadOnly}
              onFieldUpdate={updateFinalDestinationStatus}
              error={errors.responseStatusUuid?.message}
              intent={CoreSelectElementStyleIntent.LIGHT}
            />
            <CoreFormElementInstruction
              paragraphs={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.RESPONSE_STATUS.INFORMATION}
            />
            <ApplicationStatusSelectGroup
              id={'finalDestinationStatusUuid'}
              label={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.FINAL_DESTINATION_STATUS.NAME}
              selectPrompt={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.FINAL_DESTINATION_STATUS.SELECT_PROMPT}
              previouslySelectedValue={updatedData?.finalDestinationStatus ?? application.finalDestinationStatus}
              options={selectOptions.finalDestinationStatus as Array<FinalDestinationStatus>}
              isDisabled={fieldsReadOnlyStatus.isFinalDestinationStatusReadOnly}
              error={errors.finalDestinationStatusUuid?.message}
              intent={CoreSelectElementStyleIntent.LIGHT}
            />
            <CoreFormElementInstruction
              paragraphs={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.FINAL_DESTINATION_STATUS.INFORMATION}
            />
            <CoreFormAction
              isSubmissionPending={isPending}
              submissionMessage={l.PAGES.STUDENT.NEW_APPLICATION.MESSAGES.FORM_SUBMIT_LOADING}
              submitId={'update-application-form'}
              submissionValue={l.PAGES.STUDENT.NEW_APPLICATION.FORM.SUBMIT}
              errorMessage={errors.root?.message}
              intent={CoreSubmitInputElementStyleIntent.DARK}
              className={joinTw('col-start-1 col-end-3')}
            />
          </CoreFormWrapper>
        </FormProvider>
      </section>
      <Toast
        isVisible={isSuccess}
        message={l.PAGES.COMMON.APPLICATION_EDIT.FORM.SUBMISSION}
      />
    </>
  );
};
