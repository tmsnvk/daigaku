import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import {
  UpdateApplicationFormFieldsT,
  useGetAllSelectOptions,
  useHandleFormSubmission,
  useUpdateApplication,
} from './ApplicationForm.hooks.tsx';
import {
  GlobalErrorModal,
  GlobalLoadingModal,
  Toast,
} from '@components/shared/notification';
import {
  FormMetaData,
  InputError,
  InputInfoBox,
  LoadingIndicator,
  SubmitInput,
} from '@components/shared/form';
import { PageTitle } from '@components/shared/general';
import { FormContainer } from './ApplicationForm.styles.ts';
import {
  DisabledInputField,
  GenericSelectInputField,
} from '@components/shared/field-implementations';
import {
  applicationStatusInformation,
  countryInformation,
  courseNameInformation,
  finalDestinationInformation,
  formInformation,
  interviewStatusInformation,
  minorSubjectInformation,
  programmeLengthInformation,
  responseStatusInformation,
  submissionConfirmation,
  universityInformation,
} from './ApplicationForm.utilities.ts';
import { ApplicationT } from '@services/application/application.service.ts';
import { FinalDestinationStatusT } from '@services/application/finalDestinationStatus.service.ts';
import { ResponseStatusT } from '@services/application/responseStatus.service.ts';
import { OfferStatusT } from '@services/application/offerStatus.service.ts';
import { InterviewStatusT } from '@services/application/interviewStatusService.service.ts';
import { ApplicationStatusT } from '@services/application/applicationStatus.service.ts';

type ComponentPropsT = {
  applicationData: ApplicationT;
  applicationUuid: string;
}

const ApplicationForm = ({ applicationData, applicationUuid }: ComponentPropsT) => {
  const { options, isLoading, isError } = useGetAllSelectOptions();
  const { formState: { errors }, reset, handleSubmit, register, setError } = useForm<UpdateApplicationFormFieldsT>({ mode: 'onSubmit' });
  const { data: updatedData, isPending, isSuccess, mutate, error } = useUpdateApplication({ setError, reset, applicationUuid });
  const { submitForm } = useHandleFormSubmission();

  if (isLoading) {
    return <GlobalLoadingModal />;
  }

  if (isError) {
    return <GlobalErrorModal error={error instanceof AxiosError && error?.response?.data.root} />;
  }

  return (
    <>
      <FormContainer
        id={'updateApplicationForm'}
        method={'PATCH'}
        onSubmit={handleSubmit((formData) => submitForm({ formData, mutate, setError }))}
      >
        <PageTitle content={'Update Application Form'} />
        <FormMetaData
          createdAt={updatedData?.data.createdAt ?? applicationData.createdAt}
          createdBy={updatedData?.data.createdBy ?? applicationData.createdBy}
          lastUpdatedAt={updatedData ? updatedData.data.lastUpdatedAt : applicationData.lastUpdatedAt}
          lastModifiedBy={updatedData?.data.lastModifiedBy ?? applicationData.lastModifiedBy}
        />
        <InputInfoBox content={formInformation} />
        <DisabledInputField
          fieldId={'country'}
          label={'Country'}
          type={'text'}
          defaultValue={applicationData.country}
        />
        <InputInfoBox content={countryInformation} />
        <DisabledInputField
          fieldId={'university'}
          label={'University'}
          type={'text'}
          defaultValue={applicationData.university}
        />
        <InputInfoBox content={universityInformation} />
        <DisabledInputField
          fieldId={'courseName'}
          label={'Course Name'}
          type={'text'}
          defaultValue={applicationData.courseName}
        />
        <InputInfoBox content={courseNameInformation} />
        <DisabledInputField
          fieldId={'minorSubject'}
          label={'Minor Subject'}
          type={'text'}
          defaultValue={applicationData.minorSubject ?? '-'}
        />
        <InputInfoBox content={minorSubjectInformation} />
        <DisabledInputField
          fieldId={'programmeLength'}
          label={'Programme Length'}
          type={'number'}
          defaultValue={applicationData.programmeLength}
        />
        <InputInfoBox content={programmeLengthInformation} />
        <GenericSelectInputField
          register={register}
          fieldError={errors.applicationStatusUuid?.message}
          fieldId={'applicationStatusUuid'}
          labelContent={'Application Status'}
          defaultOptionFieldContent={'Update the application\'s current status.'}
          defaultValue={updatedData?.data.applicationStatus ?? applicationData.applicationStatus}
          options={options.applicationStatus?.data as ApplicationStatusT[]}
        />
        <InputInfoBox
          content={applicationStatusInformation}
        />
        <GenericSelectInputField
          register={register}
          fieldError={errors.interviewStatusUuid?.message}
          fieldId={'interviewStatusUuid'}
          labelContent={'Interview Status'}
          defaultOptionFieldContent={'Update the application\'s interview status.'}
          defaultValue={updatedData?.data.interviewStatus ?? applicationData.interviewStatus}
          options={options.interviewStatus?.data as InterviewStatusT[]}
        />
        <InputInfoBox
          content={interviewStatusInformation}
        />
        <GenericSelectInputField
          register={register}
          fieldError={errors.offerStatusUuid?.message}
          fieldId={'offerStatusUuid'}
          labelContent={'Offer Status'}
          defaultOptionFieldContent={'Update the university\'s decision.'}
          defaultValue={updatedData?.data.offerStatus ?? applicationData.offerStatus}
          options={options.offerStatus?.data as OfferStatusT[]}
        />
        <InputInfoBox
          content={responseStatusInformation}
        />
        <GenericSelectInputField
          register={register}
          fieldError={errors.responseStatusUuid?.message}
          fieldId={'responseStatusUuid'}
          labelContent={'Response Status'}
          defaultOptionFieldContent={'Update your response status.'}
          defaultValue={updatedData?.data.responseStatus ?? applicationData.responseStatus}
          options={options.responseStatus?.data as ResponseStatusT[]}
        />
        <InputInfoBox
          content={responseStatusInformation}
        />
        <GenericSelectInputField
          register={register}
          fieldError={errors.finalDestinationStatusUuid?.message}
          fieldId={'finalDestinationStatusUuid'}
          labelContent={'Final Destination Status'}
          defaultOptionFieldContent={'Update your final decision regarding this application.'}
          defaultValue={updatedData?.data.finalDestinationStatus ?? applicationData.finalDestinationStatus}
          options={options.finalDestinationStatus?.data as FinalDestinationStatusT[]}
        />
        <InputInfoBox
          content={finalDestinationInformation}
        />
        <article>
          {
            isPending ?
              <LoadingIndicator content={'Your application is being updated.'} /> :
              <SubmitInput type={'submit'} value={'update application'} disabled={isPending} />
          }
        </article>
        <article>
          {errors.root?.serverError && <InputError content={errors.root.serverError.message as string} />}
        </article>
      </FormContainer>
      <Toast
        isVisible={isSuccess}
        content={submissionConfirmation}
      />
    </>
  );
};

export default ApplicationForm;
