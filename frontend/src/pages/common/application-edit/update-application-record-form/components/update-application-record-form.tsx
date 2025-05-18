/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { zodResolver } from '@hookform/resolvers/zod';
import { JSX, useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

/* logic imports */
import { useGetAllSelectOptions } from '@daigaku/hooks';
import { useHandleFieldDisableStatus } from '../hooks/use-handle-field-disable-status.tsx';
import { useHandleFormSubmission } from '../hooks/use-handle-form-submission.tsx';
import { useUpdateApplicationFormMutation } from '../hooks/use-update-application-form-mutation.tsx';

/* component imports */
import {
  CommonSelectGroup,
  CoreFormAction,
  CoreFormElementInstruction,
  CoreFormHeader,
  CoreFormWrapper,
} from '@daigaku/components/form';
import { ApplicationMetadata } from '@daigaku/components/general';
import { DisabledInputGroups } from './disabled-input-groups.tsx';
import { IsRemovableButton } from './is-removable-button.tsx';

/* configuration, utilities, constants imports */
import { joinTw } from '@daigaku/utilities';

/* interface, type, enum, schema imports */
import {
  ApplicationRecord,
  ApplicationRecordStatusUnion,
  CoreSelectElementStyleIntent,
  CoreSubmitInputElementStyleIntent,
  UpdateApplicationRecordByStudentPayload,
} from '@daigaku/common-types';
import { FormInputValues, formValidationSchema } from '../schema.ts';

/**
 * Defines the component's properties.
 */
interface UpdateApplicationRecordFormProps {
  /**
   * The application record.
   */
  readonly application: ApplicationRecord;
}

/**
 * Renders the form edit page where users are able to amend their application data.
 *
 * @params {UpdateApplicationRecordFormProps}
 * @return {JSX.Element}
 */
export const UpdateApplicationRecordForm = ({ application }: UpdateApplicationRecordFormProps): JSX.Element => {
  const { t } = useTranslation();

  const { selectOptions, refetch, isLoading: isOptionsLoading, isError: isOptionsError } = useGetAllSelectOptions();

  const formMethods = useForm<FormInputValues>({
    mode: 'onSubmit',
    defaultValues: {
      applicationStatusUuid: '',
      interviewStatusUuid: '',
      offerStatusUuid: '',
      responseStatusUuid: '',
      finalDestinationStatusUuid: '',
    },
    resolver: zodResolver(formValidationSchema),
  });
  const { handleSubmit, setError } = formMethods;
  const { submitForm } = useHandleFormSubmission();
  const {
    data: updatedData,
    isPending,
    mutate: updateApplicationRecord,
  } = useUpdateApplicationFormMutation(setError, application.uuid);
  const submitUpdateApplicationRecordForm = (formData: FormInputValues) => {
    submitForm(
      formData as UpdateApplicationRecordByStudentPayload,
      application.uuid,
      updateApplicationRecord,
      setError,
    );
  };

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

  const useOptions = (statuses?: Array<ApplicationRecordStatusUnion>) => {
    return useMemo(
      () =>
        statuses?.map((status: ApplicationRecordStatusUnion) => (
          <option
            key={status.uuid}
            value={status.uuid}
          >
            {status.name}
          </option>
        )) || [],
      [statuses],
    );
  };

  const applicationOptions = useOptions(selectOptions.applicationStatus);
  const interviewOptions = useOptions(selectOptions.interviewStatus);
  const offerOptions = useOptions(selectOptions.offerStatus);
  const responseOptions = useOptions(selectOptions.responseStatus);
  const finalDestinationOptions = useOptions(selectOptions.finalDestinationStatus);

  return (
    <section className={joinTw('core-tertiary-border', 'w-9/10 md:w-8/10 2xl:max-w-[100rem]', 'my-[5%]')}>
      <FormProvider {...formMethods}>
        <CoreFormWrapper
          formId={'update-application-record-form'}
          onFormSubmit={handleSubmit(submitUpdateApplicationRecordForm)}
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
          <CommonSelectGroup
            id={'applicationStatusUuid'}
            isLoading={isOptionsLoading}
            isFetchError={isOptionsError}
            isDisabled={fieldsReadOnlyStatus.isApplicationStatusReadOnly}
            onRetry={refetch.applicationStatus}
            onChangeHandler={updateInterviewStatus}
            label={t('applicationStatusLabel')}
            options={applicationOptions}
            initialValue={
              updatedData?.applicationStatus.name ??
              application.applicationStatus.name ??
              t('applicationStatusPlaceholder')
            }
            intent={CoreSelectElementStyleIntent.LIGHT}
          />
          <CoreFormElementInstruction paragraph={t('applicationStatusUpdateFieldInformation')} />
          <CommonSelectGroup
            id={'interviewStatusUuid'}
            isLoading={isOptionsLoading}
            isFetchError={isOptionsError}
            isDisabled={fieldsReadOnlyStatus.isInterviewStatusReadOnly}
            onRetry={refetch.interviewStatus}
            onChangeHandler={updateOfferStatus}
            label={t('interviewStatusLabel')}
            options={interviewOptions}
            initialValue={
              updatedData?.interviewStatus?.name ?? application.interviewStatus?.name ?? t('interviewStatusPlaceholder')
            }
            intent={CoreSelectElementStyleIntent.LIGHT}
          />
          <CoreFormElementInstruction paragraph={t('interviewStatusUpdateFieldInformation')} />
          <CommonSelectGroup
            id={'offerStatusUuid'}
            isLoading={isOptionsLoading}
            isFetchError={isOptionsError}
            isDisabled={fieldsReadOnlyStatus.isOfferStatusReadOnly}
            onRetry={refetch.offerStatus}
            onChangeHandler={updateResponseStatus}
            label={t('offerStatusLabel')}
            options={offerOptions}
            initialValue={
              updatedData?.offerStatus?.name ?? application.offerStatus?.name ?? t('offerStatusPlaceholder')
            }
            intent={CoreSelectElementStyleIntent.LIGHT}
          />
          <CoreFormElementInstruction paragraph={t('offerStatusUpdateFieldInformation')} />
          <CommonSelectGroup
            id={'responseStatusUuid'}
            isLoading={isOptionsLoading}
            isFetchError={isOptionsError}
            isDisabled={fieldsReadOnlyStatus.isResponseStatusReadOnly}
            onRetry={refetch.responseStatus}
            onChangeHandler={updateFinalDestinationStatus}
            label={t('responseStatusLabel')}
            options={responseOptions}
            initialValue={
              updatedData?.responseStatus?.name ?? application.responseStatus?.name ?? t('responseStatusPlaceholder')
            }
            intent={CoreSelectElementStyleIntent.LIGHT}
          />
          <CoreFormElementInstruction paragraph={t('responseStatusUpdateFieldInformation')} />
          <CommonSelectGroup
            id={'finalDestinationStatusUuid'}
            isLoading={isOptionsLoading}
            isFetchError={isOptionsError}
            onRetry={refetch.finalDestinationStatus}
            isDisabled={fieldsReadOnlyStatus.isFinalDestinationStatusReadOnly}
            label={t('finalDestinationStatusLabel')}
            options={finalDestinationOptions}
            initialValue={
              updatedData?.finalDestinationStatus?.name ??
              application.finalDestinationStatus?.name ??
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
