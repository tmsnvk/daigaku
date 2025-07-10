/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { JSX, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

/* logic imports */
import { getStatusDisplayValue, joinTw } from '@daigaku/utilities';
import { useHandleFieldDisableStatus } from '../hooks/use-handle-field-disable-status.tsx';
import { useUpdateApplicationFormMutation } from '../hooks/use-update-application-form-mutation.tsx';
import { UpdateApplicationSchema, updateApplicationSchema } from '../schema.ts';

/* component imports */
import {
  CommonStaticSelectGroup,
  CoreFormAction,
  CoreFormElementInstruction,
  CoreFormHeader,
  CoreFormWrapper,
} from '@daigaku/components/common/form';
import { ApplicationMetadata } from '@daigaku/components/common/general';
import { DisabledInputGroups } from './disabled-input-groups.tsx';
import { IsRemovableButton } from './is-removable-button.tsx';

/* interface, type imports */
import {
  Application,
  ApplicationStatus,
  ApplicationStatusTranslations,
  ApplicationStatuses,
  FinalDestinationStatus,
  FinalDestinationStatusTranslations,
  FinalDestinationStatuses,
  InterviewStatus,
  InterviewStatusTranslations,
  InterviewStatuses,
  OfferStatus,
  OfferStatusTranslations,
  OfferStatuses,
  ResponseStatus,
  ResponseStatusTranslations,
  ResponseStatuses,
  UpdateApplicationByStudentPayload,
} from '@daigaku/common-types';

/**
 * Defines the component's properties.
 */
interface UpdateApplicationRecordFormProps {
  /**
   * The application record.
   */
  readonly application: Application;
}

/**
 * Renders the form edit page where users are able to amend their application data.
 *
 * @params {UpdateApplicationRecordFormProps}
 * @return {JSX.Element}
 */
export const UpdateApplicationForm = ({ application }: UpdateApplicationRecordFormProps): JSX.Element => {
  const { t } = useTranslation();

  const formMethods = useForm<UpdateApplicationSchema>({
    defaultValues: {
      applicationStatus: application.applicationStatus,
      interviewStatus: application.interviewStatus ?? null,
      offerStatus: application.offerStatus ?? null,
      responseStatus: application.responseStatus ?? null,
      finalDestinationStatus: application.finalDestinationStatus ?? null,
    },
    mode: 'onSubmit',
    resolver: standardSchemaResolver(updateApplicationSchema),
  });

  const { handleSubmit, setError } = formMethods;

  const {
    data: updatedData,
    isPending: isSubmitting,
    mutate: updateApplication,
  } = useUpdateApplicationFormMutation(setError, application.uuid);

  const onFormSubmit = handleSubmit((formData: UpdateApplicationSchema) => {
    updateApplication(formData as UpdateApplicationByStudentPayload);
  });

  const {
    onPageLoadValidation,
    fieldsReadOnlyStatus,
    updateInterviewStatus,
    updateOfferStatus,
    updateResponseStatus,
    updateFinalDestinationStatus,
  } = useHandleFieldDisableStatus(application, updatedData);

  useEffect(() => {
    onPageLoadValidation();
  }, []);

  return (
    <section className={joinTw('core-tertiary-border', 'w-9/10 md:w-8/10 2xl:max-w-[100rem]', 'my-[5%]')}>
      <FormProvider {...formMethods}>
        <CoreFormWrapper
          formId={'update-application-record-form'}
          onFormSubmit={onFormSubmit}
          className={'core-application-grid'}
        >
          <CoreFormHeader
            title={t('updateApplicationRecordFormTitle')}
            intent={'largeWithUnderline'}
            className={'col-start-1 col-end-3'}
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
            paragraph={t('updateApplicationRecordFormInformation')}
            className={joinTw('col-start-1 col-end-3', 'mt-20')}
          />
          <DisabledInputGroups application={application} />
          <CoreFormElementInstruction paragraph={t('programmeLengthUpdateFieldInformation')} />
          <CommonStaticSelectGroup
            id={'applicationStatus'}
            isDisabled={fieldsReadOnlyStatus.isApplicationStatusReadOnly}
            onChangeHandler={updateInterviewStatus}
            label={t('applicationStatusLabel')}
            options={Object.keys(ApplicationStatuses).map((status: string) => {
              return (
                <option
                  key={status}
                  value={status}
                >
                  {t(ApplicationStatusTranslations[status as ApplicationStatus])}
                </option>
              );
            })}
            initialValue={
              getStatusDisplayValue(ApplicationStatusTranslations, updatedData?.applicationStatus, t) ??
              getStatusDisplayValue(ApplicationStatusTranslations, application.applicationStatus, t) ??
              t('applicationStatusPlaceholder')
            }
            intent={'light'}
          />
          <CoreFormElementInstruction paragraph={t('applicationStatusUpdateFieldInformation')} />
          <CommonStaticSelectGroup
            id={'interviewStatus'}
            isDisabled={fieldsReadOnlyStatus.isInterviewStatusReadOnly}
            onChangeHandler={updateOfferStatus}
            label={t('interviewStatusLabel')}
            options={Object.keys(InterviewStatuses).map((status: string) => {
              return (
                <option
                  key={status}
                  value={status}
                >
                  {t(InterviewStatusTranslations[status as InterviewStatus])}
                </option>
              );
            })}
            initialValue={
              getStatusDisplayValue(InterviewStatusTranslations, updatedData?.interviewStatus, t) ??
              getStatusDisplayValue(InterviewStatusTranslations, application.interviewStatus, t) ??
              t('interviewStatusPlaceholder')
            }
            intent={'light'}
          />
          <CoreFormElementInstruction paragraph={t('interviewStatusUpdateFieldInformation')} />
          <CommonStaticSelectGroup
            id={'offerStatus'}
            isDisabled={fieldsReadOnlyStatus.isOfferStatusReadOnly}
            onChangeHandler={updateResponseStatus}
            label={t('offerStatusLabel')}
            options={Object.keys(OfferStatuses).map((status: string) => {
              return (
                <option
                  key={status}
                  value={status}
                >
                  {t(OfferStatusTranslations[status as OfferStatus])}
                </option>
              );
            })}
            initialValue={
              getStatusDisplayValue(OfferStatusTranslations, updatedData?.offerStatus, t) ??
              getStatusDisplayValue(OfferStatusTranslations, application.offerStatus, t) ??
              t('offerStatusPlaceholder')
            }
            intent={'light'}
          />
          <CoreFormElementInstruction paragraph={t('offerStatusUpdateFieldInformation')} />
          <CommonStaticSelectGroup
            id={'responseStatus'}
            isDisabled={fieldsReadOnlyStatus.isResponseStatusReadOnly}
            onChangeHandler={updateFinalDestinationStatus}
            label={t('responseStatusLabel')}
            options={Object.keys(ResponseStatuses).map((status: string) => {
              return (
                <option
                  key={status}
                  value={status}
                >
                  {t(ResponseStatusTranslations[status as ResponseStatus])}
                </option>
              );
            })}
            initialValue={
              getStatusDisplayValue(ResponseStatusTranslations, updatedData?.responseStatus, t) ??
              getStatusDisplayValue(ResponseStatusTranslations, application.responseStatus, t) ??
              t('responseStatusPlaceholder')
            }
            intent={'light'}
          />
          <CoreFormElementInstruction paragraph={t('responseStatusUpdateFieldInformation')} />
          <CommonStaticSelectGroup
            id={'finalDestinationStatus'}
            isDisabled={fieldsReadOnlyStatus.isFinalDestinationStatusReadOnly}
            label={t('finalDestinationStatusLabel')}
            options={Object.keys(FinalDestinationStatuses).map((status: string) => {
              return (
                <option
                  key={status}
                  value={status}
                >
                  {t(FinalDestinationStatusTranslations[status as FinalDestinationStatus])}
                </option>
              );
            })}
            initialValue={
              getStatusDisplayValue(FinalDestinationStatusTranslations, updatedData?.finalDestinationStatus, t) ??
              getStatusDisplayValue(FinalDestinationStatusTranslations, application.finalDestinationStatus, t) ??
              t('finalDestinationStatusPlaceholder')
            }
            intent={'light'}
          />
          <CoreFormElementInstruction paragraph={t('finalDestinationStatusUpdateFieldInformation')} />
          <CoreFormAction
            isSubmissionPending={isSubmitting}
            formActionConfig={{
              message: t('genericFormSubmission'),
              value: t('updateApplicationRecordFormSubmit'),
            }}
            intent={'dark'}
            className={'col-start-1 col-end-3'}
          />
        </CoreFormWrapper>
      </FormProvider>
    </section>
  );
};
