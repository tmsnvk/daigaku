import {
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';
import { useGetInterviewStatuses } from '@hooks/applications';
import {
  ErrorMessage,
  InputFieldStyles,
  InputLabel,
} from '@components/shared/form';
import { InterviewStatusT } from '@hooks/applications/useGetInterviewStatuses.tsx';

type ComponentPropsT<T extends FieldValues> = {
  register: UseFormRegister<T>,
  fieldError: string | undefined;
  fieldId: Path<T>;
  defaultValue: string;
}

const SelectInterviewStatus = <T extends FieldValues>({
  register,
  fieldError,
  fieldId,
  defaultValue,
}: ComponentPropsT<T>) => {
  const { data } = useGetInterviewStatuses();

  return (
    <InputFieldStyles $isError={fieldError !== undefined}>
      <InputLabel inputId={fieldId} content={'Interview Status'} />
      <select
        {...register(fieldId)}
        id={fieldId}
        name={fieldId}
        defaultValue={defaultValue}
      >
        {defaultValue ?? <option hidden value={''}>Update the application`&apos;`s interview status.</option>}
        {data?.map((option: InterviewStatusT) => {
          return <option key={option.uuid} value={option.uuid}>{`${option.name}`}</option>;
        })}
      </select>
      {fieldError && <ErrorMessage content={fieldError} />}
    </InputFieldStyles>
  );
};

export default SelectInterviewStatus;
