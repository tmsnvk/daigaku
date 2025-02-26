/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX, useEffect } from 'react';
import { useForm } from 'react-hook-form';

/* logic imports */
import { useHandleFieldDisableStatus, useHandleFormSubmission, useUpdateApplication } from './application-form.hooks';

/* component, style imports */
import { ApplicationMetadata } from '@components/application';
import { DisabledInput, InputError, InputGuideText, SubmitInput } from '@components/form';
import { LoadingIndicator, PageTitle } from '@components/general';
import { Toast } from '@components/notification';
import { ActiveSelectField } from '../active-select-field';
import { IsRemovableButton } from '../is-removable-button';
import { Form } from './application-form.styles';

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
interface ComponentProps {
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
export const ApplicationForm = ({ application, selectOptions }: ComponentProps): JSX.Element => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<UpdateApplicationByStudent>({ mode: 'onSubmit' });
  const { submitForm } = useHandleFormSubmission();
  const { data: updatedData, isPending, isSuccess, mutate } = useUpdateApplication(setError, application.uuid);
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
      <Form
        id={'update-application-form'}
        method={'PATCH'}
        onSubmit={handleSubmit((formData) => submitForm(formData, application.uuid, mutate, setError))}
      >
        <PageTitle title={l.PAGES.COMMON.APPLICATION_EDIT.FORM.TITLE} />
        <ApplicationMetadata
          createdAt={updatedData?.createdAt ?? application.createdAt}
          createdBy={updatedData?.createdBy ?? application.createdBy}
          lastUpdatedAt={updatedData ? updatedData.lastUpdatedAt : application.lastUpdatedAt}
          lastModifiedBy={updatedData?.lastModifiedBy ?? application.lastModifiedBy}
        />
        <IsRemovableButton
          isRemovable={updatedData?.isRemovable ?? application.isRemovable}
          applicationUuid={application.uuid}
        />
        <InputGuideText paragraphs={l.PAGES.COMMON.APPLICATION_EDIT.FORM.INFORMATION} />
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
        <article>
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
        <article>{errors.root && <InputError message={errors.root.message} />}</article>
      </Form>
      <Toast
        isVisible={isSuccess}
        message={l.PAGES.COMMON.APPLICATION_EDIT.FORM.SUBMISSION}
      />
    </>
  );
};
