/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* external imports */
import { useForm } from 'react-hook-form';

/* logic imports */
import {
  HandleFieldDisableStatus,
  HandleFormSubmission,
  UpdateApplicationFormFields,
  useHandleFieldDisableStatus,
  useHandleFormSubmission,
  useUpdateApplication,
} from './application-form.hooks';

/* component, style imports */
import { ApplicationMetadata } from '@components/application';
import { DisabledInput, InputError, InputGuideText, SubmitInput } from '@components/form';
import { LoadingIndicator, PageTitle } from '@components/general';
import { Toast } from '@components/notification';
import { ActiveSelectField } from '../active-select-field/index';
import { IsRemovableButton } from '../is-removable-button/index';
import { Form } from './application-form.styles';

/* configuration, utilities, constants imports */
import { constants } from './application-form.constants';

/* interface, type, enum imports */
import { Application, ApplicationStatus, FinalDestinationStatus, InterviewStatus, OfferStatus, ResponseStatus } from '@common-types';
import { ApplicationStatusOption } from '@hooks/application-status/use-get-all-select-options';
import { useEffect } from 'react';

/**
 * ===============
 * Component {@link ApplicationForm}
 * ===============
 */

/**
 * Defines the properties of the {@link ApplicationForm} component.
 *
 * @since 0.0.1
 */
interface ComponentProps {
  readonly application: Application;
  readonly selectOptions: ApplicationStatusOption;
}

/**
 * Renders the form edit page where users are able to amend their application data.
 *
 * @return {JSX.Element}
 *
 * @since 0.0.1
 */
export const ApplicationForm = ({ application, selectOptions }: ComponentProps): JSX.Element => {
  // `react-hook-form` handling hook.
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<UpdateApplicationFormFields>({ mode: 'onSubmit' });

  // Custom hook that submits the form.
  const { submitForm }: HandleFormSubmission = useHandleFormSubmission();

  // Custom hook that updates the application.
  const { data: updatedData, isPending, isSuccess, mutate } = useUpdateApplication(setError, application.uuid);

  // Custom hook that checks the application's fields availability.
  const {
    onPageLoadValidation,
    fieldsReadOnlyStatus,
    updateInterviewStatus,
    updateOfferStatus,
    updateResponseStatus,
    updateFinalDestinationStatus,
  }: HandleFieldDisableStatus = useHandleFieldDisableStatus(application, updatedData, selectOptions);

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
        <PageTitle title={constants.form.TITLE} />
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
        <InputGuideText paragraphs={constants.form.INFORMATION} />
        <DisabledInput
          id={'country'}
          type={'text'}
          label={constants.form.fields.country.NAME}
          value={application.country}
        />
        <InputGuideText paragraphs={constants.form.fields.country.INFORMATION} />
        <DisabledInput
          id={'university'}
          type={'text'}
          label={constants.form.fields.university.NAME}
          value={application.university}
        />
        <InputGuideText paragraphs={constants.form.fields.university.INFORMATION} />
        <DisabledInput
          id={'courseName'}
          type={'text'}
          label={constants.form.fields.courseName.NAME}
          value={application.courseName}
        />
        <InputGuideText paragraphs={constants.form.fields.courseName.INFORMATION} />
        <DisabledInput
          id={'minorSubject'}
          type={'text'}
          label={constants.form.fields.minorSubject.NAME}
          value={application.minorSubject ?? '-'}
        />
        <InputGuideText paragraphs={constants.form.fields.minorSubject.INFORMATION} />
        <DisabledInput
          id={'programmeLength'}
          type={'number'}
          label={constants.form.fields.programmeLength.NAME}
          value={application.programmeLength}
        />
        <InputGuideText paragraphs={constants.form.fields.programmeLength.INFORMATION} />
        <ActiveSelectField
          register={register}
          id={'applicationStatusUuid'}
          label={constants.form.fields.applicationStatus.NAME}
          selectPrompt={constants.form.fields.applicationStatus.SELECT_PROMPT}
          previouslySelectedValue={updatedData?.applicationStatus ?? application.applicationStatus}
          options={selectOptions.applicationStatus as Array<ApplicationStatus>}
          isDisabled={fieldsReadOnlyStatus.isApplicationStatusReadOnly}
          onFieldUpdate={updateInterviewStatus}
          error={errors.applicationStatusUuid?.message}
        />
        <InputGuideText paragraphs={constants.form.fields.applicationStatus.INFORMATION} />
        <ActiveSelectField
          register={register}
          id={'interviewStatusUuid'}
          label={constants.form.fields.interviewStatus.NAME}
          selectPrompt={constants.form.fields.interviewStatus.SELECT_PROMPT}
          previouslySelectedValue={updatedData?.interviewStatus ?? application.interviewStatus}
          options={selectOptions.interviewStatus as Array<InterviewStatus>}
          isDisabled={fieldsReadOnlyStatus.isInterviewStatusReadOnly}
          onFieldUpdate={updateOfferStatus}
          error={errors.interviewStatusUuid?.message}
        />
        <InputGuideText paragraphs={constants.form.fields.interviewStatus.INFORMATION} />
        <ActiveSelectField
          register={register}
          id={'offerStatusUuid'}
          label={constants.form.fields.offerStatus.NAME}
          selectPrompt={constants.form.fields.offerStatus.SELECT_PROMPT}
          previouslySelectedValue={updatedData?.offerStatus ?? application.offerStatus}
          options={selectOptions.offerStatus as Array<OfferStatus>}
          isDisabled={fieldsReadOnlyStatus.isOfferStatusReadOnly}
          onFieldUpdate={updateResponseStatus}
          error={errors.offerStatusUuid?.message}
        />
        <InputGuideText paragraphs={constants.form.fields.offerStatus.INFORMATION} />
        <ActiveSelectField
          register={register}
          id={'responseStatusUuid'}
          label={constants.form.fields.responseStatus.NAME}
          selectPrompt={constants.form.fields.responseStatus.SELECT_PROMPT}
          previouslySelectedValue={updatedData?.responseStatus ?? application.responseStatus}
          options={selectOptions.responseStatus as Array<ResponseStatus>}
          isDisabled={fieldsReadOnlyStatus.isResponseStatusReadOnly}
          onFieldUpdate={updateFinalDestinationStatus}
          error={errors.responseStatusUuid?.message}
        />
        <InputGuideText paragraphs={constants.form.fields.responseStatus.INFORMATION} />
        <ActiveSelectField
          register={register}
          id={'finalDestinationStatusUuid'}
          label={constants.form.fields.finalDestination.NAME}
          selectPrompt={constants.form.fields.finalDestination.SELECT_PROMPT}
          previouslySelectedValue={updatedData?.finalDestinationStatus ?? application.finalDestinationStatus}
          options={selectOptions.finalDestinationStatus as Array<FinalDestinationStatus>}
          isDisabled={fieldsReadOnlyStatus.isFinalDestinationStatusReadOnly}
          error={errors.finalDestinationStatusUuid?.message}
        />
        <InputGuideText paragraphs={constants.form.fields.finalDestination.INFORMATION} />
        <article>
          {isPending ? (
            <LoadingIndicator loadingText={constants.notifications.LOADING} />
          ) : (
            <SubmitInput
              type={'submit'}
              value={constants.notifications.SUBMIT}
              disabled={isPending}
            />
          )}
        </article>
        <article>{errors.root && <InputError message={errors.root.message} />}</article>
      </Form>
      <Toast
        isVisible={isSuccess}
        message={constants.form.SUBMISSION}
      />
    </>
  );
};
