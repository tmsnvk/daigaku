/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { zodResolver } from '@hookform/resolvers/zod';
import { JSX, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

/* logic imports */
import { useHandleFieldDisableStatus } from '../hooks/use-handle-field-disable-status.tsx';
import { useUpdateApplicationFormMutation } from '../hooks/use-update-application-form-mutation.tsx';

/* component imports */
import {
  CommonStaticSelectGroup,
  CoreFormAction,
  CoreFormElementInstruction,
  CoreFormHeader,
  CoreFormWrapper,
} from '@daigaku/components/form';
import { ApplicationMetadata } from '@daigaku/components/general';

/* configuration, utilities, constants imports */
import { getStatusDisplayValue, joinTw } from '@daigaku/utilities';
import { FormInputValues, updateApplicationFormValidationSchema } from '../schema.ts';

/* interface, type, enum, schema imports */
import {
  Application,
  ApplicationStatus,
  ApplicationStatusKey,
  ApplicationStatusTranslations,
  CoreSelectElementStyleIntent,
  CoreSubmitInputElementStyleIntent,
  FinalDestinationStatus,
  FinalDestinationStatusKey,
  FinalDestinationStatusTranslations,
  InterviewStatus,
  InterviewStatusKey,
  InterviewStatusTranslations,
  OfferStatus,
  OfferStatusKey,
  OfferStatusTranslations,
  ResponseStatus,
  ResponseStatusKey,
  ResponseStatusTranslations,
  UpdateApplicationByStudentPayload,
} from '@daigaku/common-types';
import { DisabledInputGroups } from './disabled-input-groups.tsx';
import { IsRemovableButton } from './is-removable-button.tsx';

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

  const formMethods = useForm<FormInputValues>({
    mode: 'onSubmit',
    defaultValues: {
      applicationStatus: undefined,
      interviewStatus: undefined,
      offerStatus: undefined,
      responseStatus: undefined,
      finalDestinationStatus: undefined,
    },
    resolver: zodResolver(updateApplicationFormValidationSchema),
  });
  const { handleSubmit, setError } = formMethods;
  const {
    data: updatedData,
    isPending,
    mutate: updateApplication,
  } = useUpdateApplicationFormMutation(setError, application.uuid);
  const submitUpdateApplicationForm = (formData: FormInputValues) => {
    updateApplication(formData as UpdateApplicationByStudentPayload);
  };

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
          onFormSubmit={handleSubmit(submitUpdateApplicationForm)}
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
            options={Object.keys(ApplicationStatus).map((statusKey: string) => {
              return (
                <option
                  key={statusKey}
                  value={statusKey}
                >
                  {t(ApplicationStatusTranslations[statusKey as ApplicationStatusKey])}
                </option>
              );
            })}
            initialValue={
              getStatusDisplayValue(ApplicationStatusTranslations, updatedData?.applicationStatus, t) ??
              getStatusDisplayValue(ApplicationStatusTranslations, application.applicationStatus, t) ??
              t('applicationStatusPlaceholder')
            }
            intent={CoreSelectElementStyleIntent.LIGHT}
          />
          <CoreFormElementInstruction paragraph={t('applicationStatusUpdateFieldInformation')} />
          <CommonStaticSelectGroup
            id={'interviewStatus'}
            isDisabled={fieldsReadOnlyStatus.isInterviewStatusReadOnly}
            onChangeHandler={updateOfferStatus}
            label={t('interviewStatusLabel')}
            options={Object.keys(InterviewStatus).map((statusKey: string) => {
              return (
                <option
                  key={statusKey}
                  value={statusKey}
                >
                  {t(InterviewStatusTranslations[statusKey as InterviewStatusKey])}
                </option>
              );
            })}
            initialValue={
              getStatusDisplayValue(InterviewStatusTranslations, updatedData?.interviewStatus, t) ??
              getStatusDisplayValue(InterviewStatusTranslations, application.interviewStatus, t) ??
              t('interviewStatusPlaceholder')
            }
            intent={CoreSelectElementStyleIntent.LIGHT}
          />
          <CoreFormElementInstruction paragraph={t('interviewStatusUpdateFieldInformation')} />
          <CommonStaticSelectGroup
            id={'offerStatus'}
            isDisabled={fieldsReadOnlyStatus.isOfferStatusReadOnly}
            onChangeHandler={updateResponseStatus}
            label={t('offerStatusLabel')}
            options={Object.keys(OfferStatus).map((statusKey: string) => {
              return (
                <option
                  key={statusKey}
                  value={statusKey}
                >
                  {t(OfferStatusTranslations[statusKey as OfferStatusKey])}
                </option>
              );
            })}
            initialValue={
              getStatusDisplayValue(OfferStatusTranslations, updatedData?.offerStatus, t) ??
              getStatusDisplayValue(OfferStatusTranslations, application.offerStatus, t) ??
              t('offerStatusPlaceholder')
            }
            intent={CoreSelectElementStyleIntent.LIGHT}
          />
          <CoreFormElementInstruction paragraph={t('offerStatusUpdateFieldInformation')} />
          <CommonStaticSelectGroup
            id={'responseStatus'}
            isDisabled={fieldsReadOnlyStatus.isResponseStatusReadOnly}
            onChangeHandler={updateFinalDestinationStatus}
            label={t('responseStatusLabel')}
            options={Object.keys(ResponseStatus).map((statusKey: string) => {
              return (
                <option
                  key={statusKey}
                  value={statusKey}
                >
                  {t(ResponseStatusTranslations[statusKey as ResponseStatusKey])}
                </option>
              );
            })}
            initialValue={
              getStatusDisplayValue(ResponseStatusTranslations, updatedData?.responseStatus, t) ??
              getStatusDisplayValue(ResponseStatusTranslations, application.responseStatus, t) ??
              t('responseStatusPlaceholder')
            }
            intent={CoreSelectElementStyleIntent.LIGHT}
          />
          <CoreFormElementInstruction paragraph={t('responseStatusUpdateFieldInformation')} />
          <CommonStaticSelectGroup
            id={'finalDestinationStatus'}
            isDisabled={fieldsReadOnlyStatus.isFinalDestinationStatusReadOnly}
            label={t('finalDestinationStatusLabel')}
            options={Object.keys(FinalDestinationStatus).map((statusKey: string) => {
              return (
                <option
                  key={statusKey}
                  value={statusKey}
                >
                  {t(FinalDestinationStatusTranslations[statusKey as FinalDestinationStatusKey])}
                </option>
              );
            })}
            initialValue={
              getStatusDisplayValue(FinalDestinationStatusTranslations, updatedData?.finalDestinationStatus, t) ??
              getStatusDisplayValue(FinalDestinationStatusTranslations, application.finalDestinationStatus, t) ??
              t('finalDestinationStatusPlaceholder')
            }
            intent={CoreSelectElementStyleIntent.LIGHT}
          />
          <CoreFormElementInstruction paragraph={t('finalDestinationStatusUpdateFieldInformation')} />
          <CoreFormAction
            isSubmissionPending={isPending}
            formActionConfig={{
              message: t('genericFormSubmission'),
              value: t('updateApplicationRecordFormSubmit'),
            }}
            intent={CoreSubmitInputElementStyleIntent.DARK}
            className={'col-start-1 col-end-3'}
          />
        </CoreFormWrapper>
      </FormProvider>
    </section>
  );
};
