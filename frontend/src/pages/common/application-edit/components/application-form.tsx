/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX, useEffect } from 'react';
import { useForm } from 'react-hook-form';

/* logic imports */
import { useHandleFieldDisableStatus, useHandleFormSubmission, useUpdateApplicationFormMutation } from '../hooks';

/* component, style imports */
import { ApplicationMetadata } from '@components/application';
import { CoreInputError, DisabledInput, InputGuideText, SubmitInput } from '@components/form';
import { LoadingIndicator } from '@components/general';
import { Toast } from '@components/notification';
import { ActiveSelectField } from './active-select-field';
import { IsRemovableButton } from './is-removable-button';

/* configuration, utilities, constants imports */
import { localization as l } from '@constants';

/* interface, type, enum imports */
import {
  Application,
  ApplicationStatus,
  ApplicationStatusSelectOptions,
  FinalDestinationStatus,
  InterviewStatus,
  OfferStatus,
  ResponseStatus,
  UpdateApplicationByStudent,
} from '@common-types';

/**
 * Defines the component's properties.
 */
interface ApplicationFormProps {
  /**
   * The application record.
   */
  readonly application: Application;

  /**
   * All available status select options.
   */
  readonly selectOptions: ApplicationStatusSelectOptions;
}

/**
 * Renders the form edit page where users are able to amend their application data.
 *
 * @return {JSX.Element}
 */
export const ApplicationForm = ({ application, selectOptions }: ApplicationFormProps): JSX.Element => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<UpdateApplicationByStudent>({ mode: 'onSubmit' });
  const { submitForm } = useHandleFormSubmission();
  const { data: updatedData, isPending, isSuccess, mutate } = useUpdateApplicationFormMutation(setError, application.uuid);
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
      <form
        id={'update-application-form'}
        className={'base-application-grid base-tertiary-border lg:w-[85%]'}
        onSubmit={handleSubmit((formData) => submitForm(formData, application.uuid, mutate, setError))}
      >
        <h1 className={'form-title-head col-start-1 col-end-3 text-center'}>{l.PAGES.COMMON.APPLICATION_EDIT.FORM.TITLE}</h1>
        <ApplicationMetadata
          className={'col-start-1 col-end-2 row-start-2 row-end-3 h-40'}
          createdAt={updatedData?.createdAt ?? application.createdAt}
          createdBy={updatedData?.createdBy ?? application.createdBy}
          lastUpdatedAt={updatedData ? updatedData.lastUpdatedAt : application.lastUpdatedAt}
          lastModifiedBy={updatedData?.lastModifiedBy ?? application.lastModifiedBy}
        />
        <IsRemovableButton
          isRemovable={updatedData?.isRemovable ?? application.isRemovable}
          applicationUuid={application.uuid}
        />
        <InputGuideText
          paragraphs={l.PAGES.COMMON.APPLICATION_EDIT.FORM.INFORMATION}
          className={'col-start-1 col-end-3 mt-20'}
        />
        <DisabledInput
          id={'country'}
          type={'text'}
          label={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.COUNTRY.NAME}
          value={application.country}
        />
        <InputGuideText paragraphs={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.COUNTRY.INFORMATION} />
        <DisabledInput
          id={'university'}
          type={'text'}
          label={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.UNIVERSITY.NAME}
          value={application.university}
        />
        <InputGuideText paragraphs={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.UNIVERSITY.INFORMATION} />
        <DisabledInput
          id={'courseName'}
          type={'text'}
          label={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.COURSE_NAME.NAME}
          value={application.courseName}
        />
        <InputGuideText paragraphs={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.COURSE_NAME.INFORMATION} />
        <DisabledInput
          id={'minorSubject'}
          type={'text'}
          label={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.MINOR_SUBJECT.NAME}
          value={application.minorSubject ?? '-'}
        />
        <InputGuideText paragraphs={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.MINOR_SUBJECT.INFORMATION} />
        <DisabledInput
          id={'programmeLength'}
          type={'number'}
          label={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.PROGRAMME_LENGTH.NAME}
          value={application.programmeLength}
        />
        <InputGuideText paragraphs={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.PROGRAMME_LENGTH.INFORMATION} />
        <ActiveSelectField
          register={register}
          id={'applicationStatusUuid'}
          label={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.APPLICATION_STATUS.NAME}
          selectPrompt={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.APPLICATION_STATUS.SELECT_PROMPT}
          previouslySelectedValue={updatedData?.applicationStatus ?? application.applicationStatus}
          options={selectOptions.applicationStatus as Array<ApplicationStatus>}
          isDisabled={fieldsReadOnlyStatus.isApplicationStatusReadOnly}
          onFieldUpdate={updateInterviewStatus}
          error={errors.applicationStatusUuid?.message}
        />
        <InputGuideText paragraphs={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.APPLICATION_STATUS.INFORMATION} />
        <ActiveSelectField
          register={register}
          id={'interviewStatusUuid'}
          label={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.INTERVIEW_STATUS.NAME}
          selectPrompt={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.INTERVIEW_STATUS.SELECT_PROMPT}
          previouslySelectedValue={updatedData?.interviewStatus ?? application.interviewStatus}
          options={selectOptions.interviewStatus as Array<InterviewStatus>}
          isDisabled={fieldsReadOnlyStatus.isInterviewStatusReadOnly}
          onFieldUpdate={updateOfferStatus}
          error={errors.interviewStatusUuid?.message}
        />
        <InputGuideText paragraphs={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.INTERVIEW_STATUS.INFORMATION} />
        <ActiveSelectField
          register={register}
          id={'offerStatusUuid'}
          label={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.OFFER_STATUS.NAME}
          selectPrompt={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.OFFER_STATUS.SELECT_PROMPT}
          previouslySelectedValue={updatedData?.offerStatus ?? application.offerStatus}
          options={selectOptions.offerStatus as Array<OfferStatus>}
          isDisabled={fieldsReadOnlyStatus.isOfferStatusReadOnly}
          onFieldUpdate={updateResponseStatus}
          error={errors.offerStatusUuid?.message}
        />
        <InputGuideText paragraphs={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.OFFER_STATUS.INFORMATION} />
        <ActiveSelectField
          register={register}
          id={'responseStatusUuid'}
          label={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.RESPONSE_STATUS.NAME}
          selectPrompt={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.RESPONSE_STATUS.SELECT_PROMPT}
          previouslySelectedValue={updatedData?.responseStatus ?? application.responseStatus}
          options={selectOptions.responseStatus as Array<ResponseStatus>}
          isDisabled={fieldsReadOnlyStatus.isResponseStatusReadOnly}
          onFieldUpdate={updateFinalDestinationStatus}
          error={errors.responseStatusUuid?.message}
        />
        <InputGuideText paragraphs={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.RESPONSE_STATUS.INFORMATION} />
        <ActiveSelectField
          register={register}
          id={'finalDestinationStatusUuid'}
          label={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.FINAL_DESTINATION_STATUS.NAME}
          selectPrompt={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.FINAL_DESTINATION_STATUS.SELECT_PROMPT}
          previouslySelectedValue={updatedData?.finalDestinationStatus ?? application.finalDestinationStatus}
          options={selectOptions.finalDestinationStatus as Array<FinalDestinationStatus>}
          isDisabled={fieldsReadOnlyStatus.isFinalDestinationStatusReadOnly}
          error={errors.finalDestinationStatusUuid?.message}
        />
        <InputGuideText paragraphs={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.FINAL_DESTINATION_STATUS.INFORMATION} />
        <article className={'col-start-1 col-end-3'}>
          {isPending ? (
            <LoadingIndicator loadingText={l.PAGES.COMMON.APPLICATION_EDIT.NOTIFICATIONS.APPLICATION_LOADING} />
          ) : (
            <SubmitInput
              type={'submit'}
              value={l.PAGES.COMMON.APPLICATION_EDIT.NOTIFICATIONS.APPLICATION_SUBMIT}
              disabled={isPending}
            />
          )}
        </article>
        <article className={'col-start-1 col-end-3 h-10'}>{errors.root && <CoreInputError message={errors.root.message} />}</article>
      </form>
      <Toast
        isVisible={isSuccess}
        message={l.PAGES.COMMON.APPLICATION_EDIT.FORM.SUBMISSION}
      />
    </>
  );
};
