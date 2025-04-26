/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { zodResolver } from '@hookform/resolvers/zod';
import { JSX, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

/* logic imports */
import { useGetAllSelectOptions } from '@daigaku/hooks';
import { useHandleFieldDisableStatus, useHandleFormSubmission, useUpdateApplicationFormMutation } from '../hooks';

/* component imports */
import {
  CommonSelectGroup,
  CoreFormAction,
  CoreFormElementInstruction,
  CoreFormHeader,
  CoreFormWrapper,
  DisabledInputGroup,
} from '@daigaku/components/form';
import { ApplicationMetadata } from '@daigaku/components/general';
import { Toast } from '@daigaku/components/notification';
import { IsRemovableButton } from './is-removable-button';

/* configuration, utilities, constants imports */
import { localization as l } from '@daigaku/constants';
import { joinTw } from '@daigaku/utilities';

/* interface, type, enum imports */
import {
  ApplicationRecord,
  ApplicationStatus,
  CoreSelectElementStyleIntent,
  CoreSubmitInputElementStyleIntent,
  InterviewStatus,
  OfferStatus,
  ResponseStatus,
  UpdateApplicationRecordByStudentPayload,
} from '@daigaku/common-types';

const formValidationSchema = z.object({
  applicationStatusUuid: z.string().uuid(),
  interviewStatusUuid: z.union([z.string().uuid(), z.literal('')]),
  offerStatusUuid: z.union([z.string().uuid(), z.literal('')]),
  responseStatusUuid: z.union([z.string().uuid(), z.literal('')]),
  finalDestinationStatusUuid: z.union([z.string().uuid(), z.literal('')]),
});

type FormInputValues = z.infer<typeof formValidationSchema>;

const initialFormValues: FormInputValues = {
  applicationStatusUuid: '',
  interviewStatusUuid: '',
  offerStatusUuid: '',
  responseStatusUuid: '',
  finalDestinationStatusUuid: '',
};

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
  const { selectOptions, refetch, isLoading: isOptionsLoading, isError: isOptionsError } = useGetAllSelectOptions();

  const methods = useForm<FormInputValues>({
    mode: 'onSubmit',
    defaultValues: initialFormValues,
    resolver: zodResolver(formValidationSchema),
  });
  const { handleSubmit, setError } = methods;

  const { submitForm } = useHandleFormSubmission();
  const {
    data: updatedData,
    isPending,
    isSuccess,
    mutate: updateApplicationRecord,
  } = useUpdateApplicationFormMutation(setError, application.uuid);

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
      <section className={joinTw('core-tertiary-border', 'w-9/10 md:w-8/10 2xl:max-w-[100rem]', 'my-[5%]')}>
        <FormProvider {...methods}>
          <CoreFormWrapper
            formId={'update-application-record-form'}
            onFormSubmit={handleSubmit((formData: FormInputValues) => {
              submitForm(
                formData as UpdateApplicationRecordByStudentPayload,
                application.uuid,
                updateApplicationRecord,
                setError,
              );
            })}
            className={joinTw('core-application-grid')}
          >
            <CoreFormHeader
              title={l.PAGES.COMMON.APPLICATION_EDIT.FORM.TITLE}
              intent={'largeWithUnderline'}
              className={joinTw('col-start-1 col-end-3')}
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
              paragraphs={l.PAGES.COMMON.APPLICATION_EDIT.FORM.INFORMATION}
              className={joinTw('col-start-1 col-end-3', 'mt-20')}
            />
            <DisabledInputGroup
              id={'country'}
              type={'text'}
              label={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.COUNTRY.NAME}
              value={application.country}
            />
            <CoreFormElementInstruction paragraphs={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.COUNTRY.INFORMATION} />
            <DisabledInputGroup
              id={'university'}
              type={'text'}
              label={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.UNIVERSITY.NAME}
              value={application.university}
            />
            <CoreFormElementInstruction
              paragraphs={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.UNIVERSITY.INFORMATION}
            />
            <DisabledInputGroup
              id={'courseName'}
              type={'text'}
              label={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.COURSE_NAME.NAME}
              value={application.courseName}
            />
            <CoreFormElementInstruction
              paragraphs={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.COURSE_NAME.INFORMATION}
            />
            <DisabledInputGroup
              id={'minorSubject'}
              type={'text'}
              label={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.MINOR_SUBJECT.NAME}
              value={application.minorSubject ?? '-'}
            />
            <CoreFormElementInstruction
              paragraphs={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.MINOR_SUBJECT.INFORMATION}
            />
            <DisabledInputGroup
              id={'programmeLength'}
              type={'number'}
              label={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.PROGRAMME_LENGTH.NAME}
              value={application.programmeLength}
            />
            <CoreFormElementInstruction
              paragraphs={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.PROGRAMME_LENGTH.INFORMATION}
            />
            <CommonSelectGroup
              id={'applicationStatusUuid'}
              isLoading={isOptionsLoading}
              isError={isOptionsError}
              isDisabled={fieldsReadOnlyStatus.isApplicationStatusReadOnly}
              onRetry={refetch.applicationStatus}
              onChangeHandler={updateInterviewStatus}
              label={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.APPLICATION_STATUS.NAME}
              options={selectOptions.applicationStatus?.map((status: ApplicationStatus) => (
                <option
                  key={status.uuid}
                  value={status.uuid}
                >
                  {status.name}
                </option>
              ))}
              initialValue={
                updatedData?.applicationStatus.name ??
                application.applicationStatus.name ??
                l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.APPLICATION_STATUS.SELECT_PROMPT
              }
              intent={CoreSelectElementStyleIntent.LIGHT}
            />
            <CoreFormElementInstruction
              paragraphs={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.APPLICATION_STATUS.INFORMATION}
            />
            <CommonSelectGroup
              id={'interviewStatusUuid'}
              isLoading={isOptionsLoading}
              isError={isOptionsError}
              isDisabled={fieldsReadOnlyStatus.isInterviewStatusReadOnly}
              onRetry={refetch.interviewStatus}
              onChangeHandler={updateOfferStatus}
              label={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.INTERVIEW_STATUS.NAME}
              options={selectOptions.interviewStatus?.map((status: InterviewStatus) => (
                <option
                  key={status.uuid}
                  value={status.uuid}
                >
                  {status.name}
                </option>
              ))}
              initialValue={
                updatedData?.interviewStatus?.name ??
                application.interviewStatus?.name ??
                l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.INTERVIEW_STATUS.SELECT_PROMPT
              }
              intent={CoreSelectElementStyleIntent.LIGHT}
            />
            <CoreFormElementInstruction
              paragraphs={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.INTERVIEW_STATUS.INFORMATION}
            />
            <CommonSelectGroup
              id={'offerStatusUuid'}
              isLoading={isOptionsLoading}
              isError={isOptionsError}
              isDisabled={fieldsReadOnlyStatus.isOfferStatusReadOnly}
              onRetry={refetch.offerStatus}
              onChangeHandler={updateResponseStatus}
              label={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.OFFER_STATUS.NAME}
              options={selectOptions.offerStatus?.map((status: OfferStatus) => (
                <option
                  key={status.uuid}
                  value={status.uuid}
                >
                  {status.name}
                </option>
              ))}
              initialValue={
                updatedData?.offerStatus?.name ??
                application.offerStatus?.name ??
                l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.OFFER_STATUS.SELECT_PROMPT
              }
              intent={CoreSelectElementStyleIntent.LIGHT}
            />
            <CoreFormElementInstruction
              paragraphs={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.OFFER_STATUS.INFORMATION}
            />
            <CommonSelectGroup
              id={'responseStatusUuid'}
              isLoading={isOptionsLoading}
              isError={isOptionsError}
              isDisabled={fieldsReadOnlyStatus.isResponseStatusReadOnly}
              onRetry={refetch.interviewStatus}
              onChangeHandler={updateFinalDestinationStatus}
              label={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.RESPONSE_STATUS.NAME}
              options={selectOptions.responseStatus?.map((status: ResponseStatus) => (
                <option
                  key={status.uuid}
                  value={status.uuid}
                >
                  {status.name}
                </option>
              ))}
              initialValue={
                updatedData?.responseStatus?.name ??
                application.responseStatus?.name ??
                l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.RESPONSE_STATUS.SELECT_PROMPT
              }
              intent={CoreSelectElementStyleIntent.LIGHT}
            />
            <CoreFormElementInstruction
              paragraphs={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.RESPONSE_STATUS.INFORMATION}
            />
            <CommonSelectGroup
              id={'finalDestinationStatusUuid'}
              isLoading={isOptionsLoading}
              isError={isOptionsError}
              onRetry={refetch.finalDestinationStatus}
              isDisabled={fieldsReadOnlyStatus.isFinalDestinationStatusReadOnly}
              label={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.FINAL_DESTINATION_STATUS.NAME}
              options={selectOptions.finalDestinationStatus?.map((status: ResponseStatus) => (
                <option
                  key={status.uuid}
                  value={status.uuid}
                >
                  {status.name}
                </option>
              ))}
              initialValue={
                updatedData?.finalDestinationStatus?.name ??
                application.finalDestinationStatus?.name ??
                l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.FINAL_DESTINATION_STATUS.SELECT_PROMPT
              }
              intent={CoreSelectElementStyleIntent.LIGHT}
            />
            <CoreFormElementInstruction
              paragraphs={l.PAGES.COMMON.APPLICATION_EDIT.FORM.FIELDS.FINAL_DESTINATION_STATUS.INFORMATION}
            />
            <CoreFormAction
              isSubmissionPending={isPending}
              formActionConfig={{
                message: l.PAGES.STUDENT.NEW_APPLICATION.MESSAGES.FORM_SUBMIT_LOADING,
                value: l.PAGES.STUDENT.NEW_APPLICATION.FORM.SUBMIT,
              }}
              intent={CoreSubmitInputElementStyleIntent.DARK}
              className={joinTw('col-start-1 col-end-3')}
            />
          </CoreFormWrapper>
        </FormProvider>
      </section>
      <Toast
        isVisible={isSuccess}
        message={l.PAGES.COMMON.APPLICATION_EDIT.FORM.SUBMISSION}
      />
    </>
  );
};
