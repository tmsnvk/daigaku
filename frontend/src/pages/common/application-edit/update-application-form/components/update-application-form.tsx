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
import { joinTw } from '@daigaku/utilities';
import { getStatusDisplayValue } from '../../../../../utilities/get-status-display-value.ts';
import { FormInputValues, updateApplicationFormValidationSchema } from '../schema.ts';

/* interface, type, enum, schema imports */
import {
  Application,
  ApplicationStatus,
  ApplicationStatusKey,
  CoreSelectElementStyleIntent,
  CoreSubmitInputElementStyleIntent,
  FinalDestinationStatus,
  FinalDestinationStatusKey,
  InterviewStatus,
  InterviewStatusKey,
  OfferStatus,
  OfferStatusKey,
  ResponseStatus,
  ResponseStatusKey,
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
      applicationStatusUuid: '',
      interviewStatusUuid: '',
      offerStatusUuid: '',
      responseStatusUuid: '',
      finalDestinationStatusUuid: '',
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
            id={'applicationStatusUuid'}
            isDisabled={fieldsReadOnlyStatus.isApplicationStatusReadOnly}
            onChangeHandler={updateInterviewStatus}
            label={t('applicationStatusLabel')}
            options={Object.keys(ApplicationStatus).map((key: string) => {
              const backendValue = key as ApplicationStatusKey;
              const displayValue = ApplicationStatus[backendValue];

              return (
                <option
                  key={backendValue}
                  value={backendValue}
                >
                  t({displayValue})
                </option>
              );
            })}
            initialValue={
              getStatusDisplayValue(ApplicationStatus, updatedData?.applicationStatus) ??
              getStatusDisplayValue(ApplicationStatus, application.applicationStatus) ??
              t('applicationStatusPlaceholder')
            }
            intent={CoreSelectElementStyleIntent.LIGHT}
          />
          <CoreFormElementInstruction paragraph={t('applicationStatusUpdateFieldInformation')} />
          <CommonStaticSelectGroup
            id={'interviewStatusUuid'}
            isDisabled={fieldsReadOnlyStatus.isInterviewStatusReadOnly}
            onChangeHandler={updateOfferStatus}
            label={t('interviewStatusLabel')}
            options={Object.keys(InterviewStatus).map((key: string) => {
              const backendValue = key as InterviewStatusKey;
              const displayValue = InterviewStatus[backendValue];

              return (
                <option
                  key={backendValue}
                  value={backendValue}
                >
                  t({displayValue})
                </option>
              );
            })}
            initialValue={
              getStatusDisplayValue(InterviewStatus, updatedData?.interviewStatus) ??
              getStatusDisplayValue(InterviewStatus, application.interviewStatus) ??
              t('interviewStatusPlaceholder')
            }
            intent={CoreSelectElementStyleIntent.LIGHT}
          />
          <CoreFormElementInstruction paragraph={t('interviewStatusUpdateFieldInformation')} />
          <CommonStaticSelectGroup
            id={'offerStatusUuid'}
            isDisabled={fieldsReadOnlyStatus.isOfferStatusReadOnly}
            onChangeHandler={updateResponseStatus}
            label={t('offerStatusLabel')}
            options={Object.keys(OfferStatus).map((key: string) => {
              const backendValue = key as OfferStatusKey;
              const displayValue = OfferStatus[backendValue];

              return (
                <option
                  key={backendValue}
                  value={backendValue}
                >
                  t({displayValue})
                </option>
              );
            })}
            initialValue={
              getStatusDisplayValue(OfferStatus, updatedData?.offerStatus) ??
              getStatusDisplayValue(OfferStatus, application.offerStatus) ??
              t('offerStatusPlaceholder')
            }
            intent={CoreSelectElementStyleIntent.LIGHT}
          />
          <CoreFormElementInstruction paragraph={t('offerStatusUpdateFieldInformation')} />
          <CommonStaticSelectGroup
            id={'responseStatusUuid'}
            isDisabled={fieldsReadOnlyStatus.isResponseStatusReadOnly}
            onChangeHandler={updateFinalDestinationStatus}
            label={t('responseStatusLabel')}
            options={Object.keys(ResponseStatus).map((key: string) => {
              const backendValue = key as ResponseStatusKey;
              const displayValue = ResponseStatus[backendValue];

              return (
                <option
                  key={backendValue}
                  value={backendValue}
                >
                  t({displayValue})
                </option>
              );
            })}
            initialValue={
              getStatusDisplayValue(ResponseStatus, updatedData?.responseStatus) ??
              getStatusDisplayValue(ResponseStatus, application.responseStatus) ??
              t('responseStatusPlaceholder')
            }
            intent={CoreSelectElementStyleIntent.LIGHT}
          />
          <CoreFormElementInstruction paragraph={t('responseStatusUpdateFieldInformation')} />
          <CommonStaticSelectGroup
            id={'finalDestinationStatusUuid'}
            isDisabled={fieldsReadOnlyStatus.isFinalDestinationStatusReadOnly}
            label={t('finalDestinationStatusLabel')}
            options={Object.keys(FinalDestinationStatus).map((key: string) => {
              const backendValue = key as FinalDestinationStatusKey;
              const displayValue = FinalDestinationStatus[backendValue];

              return (
                <option
                  key={backendValue}
                  value={backendValue}
                >
                  t({displayValue})
                </option>
              );
            })}
            initialValue={
              getStatusDisplayValue(FinalDestinationStatus, updatedData?.finalDestinationStatus) ??
              getStatusDisplayValue(FinalDestinationStatus, application.finalDestinationStatus) ??
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
