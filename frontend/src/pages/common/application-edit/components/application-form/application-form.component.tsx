/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
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
import { Application } from '@common-types';
import { ApplicationStatusOption } from '@hooks/application-status/use-get-all-select-options';
import { ApplicationStatus } from '@services/status/application-status.service';
import { FinalDestinationStatus } from '@services/status/final-destination-status.service';
import { InterviewStatus } from '@services/status/interview-status-service.service';
import { OfferStatus } from '@services/status/offer-status.service';
import { ResponseStatus } from '@services/status/response-status.service';

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

  // Application updating hook.
  const { data: updatedData, isPending, isSuccess, mutate } = useUpdateApplication(setError, application.uuid);

  // Application field availability checking hook.
  const {
    fieldsReadOnlyStatus,
    updateInterviewStatus,
    updateOfferStatus,
    updateResponseStatus,
    updateFinalDestinationStatus,
    disableFieldsOnFinalDestinationUpdate,
  }: HandleFieldDisableStatus = useHandleFieldDisableStatus(application, updatedData, selectOptions);

  // Form submission hook.
  const { submitForm }: HandleFormSubmission = useHandleFormSubmission();

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
          label={constants.fields.country.NAME}
          value={application.country}
        />
        <InputGuideText paragraphs={constants.fields.country.INFORMATION} />
        <DisabledInput
          id={'university'}
          type={'text'}
          label={constants.fields.university.NAME}
          value={application.university}
        />
        <InputGuideText paragraphs={constants.fields.university.INFORMATION} />
        <DisabledInput
          id={'courseName'}
          type={'text'}
          label={constants.fields.courseName.NAME}
          value={application.courseName}
        />
        <InputGuideText paragraphs={constants.fields.courseName.INFORMATION} />
        <DisabledInput
          id={'minorSubject'}
          type={'text'}
          label={constants.fields.minorSubject.NAME}
          value={application.minorSubject ?? '-'}
        />
        <InputGuideText paragraphs={constants.fields.minorSubject.INFORMATION} />
        <DisabledInput
          id={'programmeLength'}
          type={'number'}
          label={constants.fields.programmeLength.NAME}
          value={application.programmeLength}
        />
        <InputGuideText paragraphs={constants.fields.programmeLength.INFORMATION} />
        <ActiveSelectField
          register={register}
          id={'applicationStatusUuid'}
          label={constants.fields.applicationStatus.NAME}
          selectPrompt={constants.fields.applicationStatus.SELECT_PROMPT}
          previouslySelectedValue={updatedData?.applicationStatus ?? application.applicationStatus}
          options={selectOptions.applicationStatus as Array<ApplicationStatus>}
          isDisabled={fieldsReadOnlyStatus.isApplicationStatusReadOnly}
          onFieldUpdate={updateInterviewStatus}
          error={errors.applicationStatusUuid?.message}
        />
        <InputGuideText paragraphs={constants.fields.applicationStatus.INFORMATION} />
        <ActiveSelectField
          register={register}
          id={'interviewStatusUuid'}
          label={constants.fields.interviewStatus.NAME}
          selectPrompt={constants.fields.interviewStatus.SELECT_PROMPT}
          previouslySelectedValue={updatedData?.interviewStatus ?? application.interviewStatus}
          options={selectOptions.interviewStatus as Array<InterviewStatus>}
          isDisabled={fieldsReadOnlyStatus.isInterviewStatusReadOnly}
          onFieldUpdate={updateOfferStatus}
          error={errors.interviewStatusUuid?.message}
        />
        <InputGuideText paragraphs={constants.fields.interviewStatus.INFORMATION} />
        <ActiveSelectField
          register={register}
          id={'offerStatusUuid'}
          label={constants.fields.offerStatus.NAME}
          selectPrompt={constants.fields.offerStatus.SELECT_PROMPT}
          previouslySelectedValue={updatedData?.offerStatus ?? application.offerStatus}
          options={selectOptions.offerStatus as Array<OfferStatus>}
          isDisabled={fieldsReadOnlyStatus.isOfferStatusReadOnly}
          onFieldUpdate={updateResponseStatus}
          error={errors.offerStatusUuid?.message}
        />
        <InputGuideText paragraphs={constants.fields.offerStatus.INFORMATION} />
        <ActiveSelectField
          register={register}
          id={'responseStatusUuid'}
          label={constants.fields.responseStatus.NAME}
          selectPrompt={constants.fields.responseStatus.SELECT_PROMPT}
          previouslySelectedValue={updatedData?.responseStatus ?? application.responseStatus}
          options={selectOptions.responseStatus as Array<ResponseStatus>}
          isDisabled={fieldsReadOnlyStatus.isResponseStatusReadOnly}
          onFieldUpdate={updateFinalDestinationStatus}
          error={errors.responseStatusUuid?.message}
        />
        <InputGuideText paragraphs={constants.fields.responseStatus.INFORMATION} />
        <ActiveSelectField
          register={register}
          id={'finalDestinationStatusUuid'}
          label={constants.fields.finalDestination.NAME}
          selectPrompt={constants.fields.finalDestination.SELECT_PROMPT}
          previouslySelectedValue={updatedData?.finalDestinationStatus ?? application.finalDestinationStatus}
          options={selectOptions.finalDestinationStatus as Array<FinalDestinationStatus>}
          isDisabled={fieldsReadOnlyStatus.isFinalDestinationStatusReadOnly}
          onFieldUpdate={disableFieldsOnFinalDestinationUpdate}
          error={errors.finalDestinationStatusUuid?.message}
        />
        <InputGuideText paragraphs={constants.fields.finalDestination.INFORMATION} />
        <article>
          {isPending ? (
            <LoadingIndicator loadingText={constants.ui.LOADING} />
          ) : (
            <SubmitInput
              type={'submit'}
              value={constants.ui.SUBMIT}
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
