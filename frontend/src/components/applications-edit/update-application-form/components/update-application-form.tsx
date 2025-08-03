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
import { useUpdateApplicationForm } from '../hooks/use-update-application-form.tsx';
import { UpdateApplicationSchema, updateApplicationSchema } from '../schema.ts';

/* component imports */
import { ApplicationMetadata } from '@daigaku/components/common';
import {
  ElementInstruction,
  FormHeader,
  FormWrapper,
  SelectGroup,
  SubmitInputGroup,
} from '@daigaku/components/common/form';
import { IsRemovableButton } from './is-removable-button.tsx';
import { ReadOnlyInputGroups } from './readonly-input-groups.tsx';

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
  } = useUpdateApplicationForm(setError, application.uuid);

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
    <section className={joinTw('core-tertiary-border w-9/10 my-[5%]', 'md:w-8/10 2xl:max-w-[100rem]')}>
      <FormProvider {...formMethods}>
        <FormWrapper
          className={'core-application-grid'}
          formId={'update-application-form'}
          onFormSubmit={onFormSubmit}
        >
          <FormHeader
            className={'col-start-1 col-end-3'}
            intent={'largeWithUnderline'}
            title={t('app.page.applicationEdit.description.formTitle')}
          />
          <ApplicationMetadata
            className={'col-start-1 col-end-2 row-start-2 row-end-3 h-40'}
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
            applicationUuid={application.uuid}
            isRemovable={updatedData?.isRemovable ?? application.isRemovable}
          />
          <ElementInstruction
            className={'col-start-1 col-end-3 mt-20'}
            paragraph={t('app.page.applicationEdit.description.formInformation')}
          />
          <ReadOnlyInputGroups application={application} />
          <SelectGroup
            defaultValue={
              getStatusDisplayValue(ApplicationStatusTranslations, updatedData?.applicationStatus, t) ??
              getStatusDisplayValue(ApplicationStatusTranslations, application.applicationStatus, t) ??
              t('app.page.applicationEdit.form.applicationStatusPlaceholder')
            }
            disabled={fieldsReadOnlyStatus.isApplicationStatusReadOnly}
            id={'applicationStatus'}
            intent={'light'}
            label={t('app.page.applicationEdit.form.applicationStatusLabel')}
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
            onChange={updateInterviewStatus}
          />
          <ElementInstruction paragraph={t('app.page.applicationEdit.description.applicationStatus')} />
          <SelectGroup
            defaultValue={
              getStatusDisplayValue(InterviewStatusTranslations, updatedData?.interviewStatus, t) ??
              getStatusDisplayValue(InterviewStatusTranslations, application.interviewStatus, t) ??
              t('app.page.applicationEdit.form.interviewStatusPlaceholder')
            }
            disabled={fieldsReadOnlyStatus.isInterviewStatusReadOnly}
            id={'interviewStatus'}
            intent={'light'}
            label={t('app.page.applicationEdit.form.interviewStatusLabel')}
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
            onChange={updateOfferStatus}
          />
          <ElementInstruction paragraph={t('app.page.applicationEdit.description.interviewStatus')} />
          <SelectGroup
            defaultValue={
              getStatusDisplayValue(OfferStatusTranslations, updatedData?.offerStatus, t) ??
              getStatusDisplayValue(OfferStatusTranslations, application.offerStatus, t) ??
              t('app.page.applicationEdit.form.offerStatusPlaceholder')
            }
            disabled={fieldsReadOnlyStatus.isOfferStatusReadOnly}
            id={'offerStatus'}
            intent={'light'}
            label={t('app.page.applicationEdit.form.offerStatusLabel')}
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
            onChange={updateResponseStatus}
          />
          <ElementInstruction paragraph={t('app.page.applicationEdit.description.offerStatus')} />
          <SelectGroup
            defaultValue={
              getStatusDisplayValue(ResponseStatusTranslations, updatedData?.responseStatus, t) ??
              getStatusDisplayValue(ResponseStatusTranslations, application.responseStatus, t) ??
              t('app.page.applicationEdit.form.responseStatusPlaceholder')
            }
            disabled={fieldsReadOnlyStatus.isResponseStatusReadOnly}
            id={'responseStatus'}
            intent={'light'}
            label={t('app.page.applicationEdit.form.responseStatusLabel')}
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
            onChange={updateFinalDestinationStatus}
          />
          <ElementInstruction paragraph={t('app.page.applicationEdit.description.responseStatus')} />
          <SelectGroup
            defaultValue={
              getStatusDisplayValue(FinalDestinationStatusTranslations, updatedData?.finalDestinationStatus, t) ??
              getStatusDisplayValue(FinalDestinationStatusTranslations, application.finalDestinationStatus, t) ??
              t('app.page.applicationEdit.form.finalDestinationStatusPlaceholder')
            }
            disabled={fieldsReadOnlyStatus.isFinalDestinationStatusReadOnly}
            id={'finalDestinationStatus'}
            intent={'light'}
            label={t('app.page.applicationEdit.form.finalDestinationStatusLabel')}
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
          />
          <ElementInstruction paragraph={t('app.page.applicationEdit.description.finalDestinationStatus')} />
          <SubmitInputGroup
            className={'col-start-1 col-end-3'}
            formActionConfig={{
              message: t('app.generic.loading.formSubmission'),
              value: t('app.page.applicationEdit.form.submitButton'),
            }}
            intent={'dark'}
            isSubmissionPending={isSubmitting}
          />
        </FormWrapper>
      </FormProvider>
    </section>
  );
};
