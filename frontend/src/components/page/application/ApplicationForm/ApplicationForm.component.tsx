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
  GeneralInputField,
} from '@components/shared/field-implementations';
import { ApplicationT } from '@custom-types/ApplicationT.ts';
import {
  formInformation,
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
        {/*<GeneralInputField*/}
        {/*  register={register}*/}
        {/*  validation={{*/}
        {/*    required: {*/}
        {/*      value: true,*/}
        {/*      message: 'Providing the name of your selected course is required.',*/}
        {/*    },*/}
        {/*    pattern: {*/}
        {/*      value: /^[A-Za-z-\s]{5,255}$/,*/}
        {/*      message: 'Use only letters and spaces. Provide a minimum of 5 and a maximum of 255 characters.',*/}
        {/*    },*/}
        {/*  }}*/}
        {/*  fieldError={errors.courseName?.message}*/}
        {/*  fieldId={'courseName'}*/}
        {/*  label={'Course name'}*/}
        {/*  type={'text'}*/}
        {/*  placeholder={'Provide the course of your choice.'}*/}
        {/*  defaultValue={''}*/}
        {/*  isDisabled={isPending}*/}
        {/*/>*/}
      </ApplicationFormGridContainer>
    </>
  );
};

export default ApplicationForm;
