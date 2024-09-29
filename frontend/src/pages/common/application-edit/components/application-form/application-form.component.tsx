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
  HandleFormSubmission,
  UpdateApplicationFormFields,
  useHandleFieldDisableStatuses,
  useHandleFormSubmission,
  useUpdateApplication,
} from './application-form.hooks';

/* component, style imports */
import { ApplicationMetadata } from '@components/application';
import { DisabledInputField, InputError, InputFieldGuideText, SubmitInput } from '@components/form';
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

/* interfaces, types, enums */
interface ComponentProps {
  readonly application: Application;
  readonly selectOptions: ApplicationStatusOption;
}

/**
 * @description
 * The component renders the form edit page where users are able to amend their application data.
 *
 * @returns {JSX.Element}
 *
 * @since 0.0.1
 */
export const ApplicationForm = ({ application, selectOptions }: ComponentProps): JSX.Element => {
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
  const { submitForm }: HandleFormSubmission = useHandleFormSubmission();

  return (
    <>
      <Form
        id={'update-application-form'}
        method={'PATCH'}
        onSubmit={handleSubmit((formData) => submitForm({ formData, applicationUuid: application.uuid, mutate, setError }))}
      >
        <PageTitle content={constants.form.TITLE} />
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
        <InputFieldGuideText content={constants.form.INFORMATION} />
        <DisabledInputField
          fieldId={'country'}
          type={'text'}
          label={constants.fields.country.NAME}
          value={application.country}
        />
        <InputFieldGuideText content={constants.fields.country.INFORMATION} />
        <DisabledInputField
          fieldId={'university'}
          type={'text'}
          label={constants.fields.university.NAME}
          value={application.university}
        />
        <InputFieldGuideText content={constants.fields.university.INFORMATION} />
        <DisabledInputField
          fieldId={'courseName'}
          type={'text'}
          label={constants.fields.courseName.NAME}
          value={application.courseName}
        />
        <InputFieldGuideText content={constants.fields.courseName.INFORMATION} />
        <DisabledInputField
          fieldId={'minorSubject'}
          type={'text'}
          label={constants.fields.minorSubject.NAME}
          value={application.minorSubject ?? '-'}
        />
        <InputFieldGuideText content={constants.fields.minorSubject.INFORMATION} />
        <DisabledInputField
          fieldId={'programmeLength'}
          type={'number'}
          label={constants.fields.programmeLength.NAME}
          value={application.programmeLength}
        />
        <InputFieldGuideText content={constants.fields.programmeLength.INFORMATION} />
        <ActiveSelectField
          register={register}
          id={'applicationStatusUuid'}
          label={constants.fields.applicationStatus.NAME}
          selectPrompt={constants.fields.applicationStatus.SELECT_PROMPT}
          previouslySelectedValue={updatedData?.applicationStatus ?? application.applicationStatus}
          options={selectOptions.applicationStatus as Array<ApplicationStatus>}
          isReadOnly={fieldsReadOnlyStatus.isApplicationStatusReadOnly}
          onFieldUpdate={updateInterviewStatus}
          fieldError={errors.applicationStatusUuid?.message}
        />
        <InputFieldGuideText content={constants.fields.applicationStatus.INFORMATION} />
        <ActiveSelectField
          register={register}
          id={'interviewStatusUuid'}
          label={constants.fields.interviewStatus.NAME}
          selectPrompt={constants.fields.interviewStatus.SELECT_PROMPT}
          previouslySelectedValue={updatedData?.interviewStatus ?? application.interviewStatus}
          options={selectOptions.interviewStatus as Array<InterviewStatus>}
          isReadOnly={fieldsReadOnlyStatus.isInterviewStatusReadOnly}
          onFieldUpdate={updateOfferStatus}
          fieldError={errors.interviewStatusUuid?.message}
        />
        <InputFieldGuideText content={constants.fields.interviewStatus.INFORMATION} />
        <ActiveSelectField
          register={register}
          id={'offerStatusUuid'}
          label={constants.fields.offerStatus.NAME}
          selectPrompt={constants.fields.offerStatus.SELECT_PROMPT}
          previouslySelectedValue={updatedData?.offerStatus ?? application.offerStatus}
          options={selectOptions.offerStatus as Array<OfferStatus>}
          isReadOnly={fieldsReadOnlyStatus.isOfferStatusReadOnly}
          onFieldUpdate={updateResponseStatus}
          fieldError={errors.offerStatusUuid?.message}
        />
        <InputFieldGuideText content={constants.fields.offerStatus.INFORMATION} />
        <ActiveSelectField
          register={register}
          id={'responseStatusUuid'}
          label={constants.fields.responseStatus.NAME}
          selectPrompt={constants.fields.responseStatus.SELECT_PROMPT}
          previouslySelectedValue={updatedData?.responseStatus ?? application.responseStatus}
          options={selectOptions.responseStatus as Array<ResponseStatus>}
          isReadOnly={fieldsReadOnlyStatus.isResponseStatusReadOnly}
          onFieldUpdate={updateFinalDestinationStatus}
          fieldError={errors.responseStatusUuid?.message}
        />
        <InputFieldGuideText content={constants.fields.responseStatus.INFORMATION} />
        <ActiveSelectField
          register={register}
          id={'finalDestinationStatusUuid'}
          label={constants.fields.finalDestination.NAME}
          selectPrompt={constants.fields.finalDestination.SELECT_PROMPT}
          previouslySelectedValue={updatedData?.finalDestinationStatus ?? application.finalDestinationStatus}
          options={selectOptions.finalDestinationStatus as Array<FinalDestinationStatus>}
          isReadOnly={fieldsReadOnlyStatus.isFinalDestinationStatusReadOnly}
          onFieldUpdate={disableFieldsOnFinalDestinationUpdate}
          fieldError={errors.finalDestinationStatusUuid?.message}
        />
        <InputFieldGuideText content={constants.fields.finalDestination.INFORMATION} />
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
        <article>{errors.root && <InputError errorText={errors.root.message} />}</article>
      </Form>
      <Toast
        isVisible={isSuccess}
        message={constants.form.SUBMISSION}
      />
    </>
  );
};
