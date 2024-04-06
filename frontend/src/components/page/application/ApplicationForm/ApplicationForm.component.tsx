import { useForm } from 'react-hook-form';
import {
  UpdateApplicationFormFieldsT,
  useUpdateApplication,
} from './ApplicationForm.hooks.tsx';
import {
  ApplicationFormGridContainer,
  InputInfoBox,
} from '@components/shared/form';
import { GenericTitle } from '@components/shared/general';
import {
  DisabledInputField,
  SelectApplicationStatus,
} from '@components/shared/field-implementations';
import { ApplicationT } from '@custom-types/ApplicationT.ts';
import {
  applicationStatusInformation,
  countryInformation,
  courseNameInformation,
  formInformation,
  minorSubjectInformation,
  programmeLengthInformation,
  universityInformation,
} from './ApplicationForm.utilities.ts';

type ComponentPropsT = {
  data: ApplicationT;
  applicationId: string
}

const ApplicationForm = ({ data, applicationId }: ComponentPropsT) => {
  const { formState: { errors }, reset, handleSubmit, register, setError } = useForm<UpdateApplicationFormFieldsT>({ mode: 'onSubmit' });
  const { isPending, isSuccess, mutate } = useUpdateApplication({ setError, reset, applicationId });

  return (
    <>
      <ApplicationFormGridContainer id={'updateApplicationForm'} method={'PUT'} onSubmit={handleSubmit((formData) => mutate(formData))}>
        <GenericTitle content={'Application Form'} />
        <InputInfoBox content={formInformation} />
        <DisabledInputField
          fieldId={'country'}
          label={'Country'}
          type={'text'}
          defaultValue={data.country}
        />
        <InputInfoBox content={countryInformation} />
        <DisabledInputField
          fieldId={'university'}
          label={'University'}
          type={'text'}
          defaultValue={data.university}
        />
        <InputInfoBox content={universityInformation} />
        <DisabledInputField
          fieldId={'courseName'}
          label={'Course Name'}
          type={'text'}
          defaultValue={data.courseName}
        />
        <InputInfoBox content={courseNameInformation} />
        <DisabledInputField
          fieldId={'minorSubject'}
          label={'Minor Subject'}
          type={'text'}
          defaultValue={data.minorSubject ?? '-'}
        />
        <InputInfoBox content={minorSubjectInformation} />
        <DisabledInputField
          fieldId={'programmeLength'}
          label={'Programme Length'}
          type={'number'}
          defaultValue={data.programmeLength}
        />
        <InputInfoBox content={programmeLengthInformation} />
        <SelectApplicationStatus
          register={register}
          fieldError={errors.applicationStatus?.message}
          fieldId={'applicationStatus'}
          defaultValue={data.applicationStatus}
        />
        <InputInfoBox
          content={applicationStatusInformation}
        />
      </ApplicationFormGridContainer>
    </>
  );
};

export default ApplicationForm;
