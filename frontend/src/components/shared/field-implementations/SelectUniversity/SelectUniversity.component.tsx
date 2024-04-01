import {
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';
import {
  ErrorMessage,
  InputFieldStyles,
  InputLabel,
} from '@components/shared/form';
import { UniversitiesT } from '@hooks/useGetUniversityOptions.tsx';

type ComponentPropsT<T extends FieldValues> = {
  register: UseFormRegister<T>,
  fieldError: string | undefined;
  fieldId: Path<T>;
  defaultValue: string;
  isDisabled: boolean;
  data: UniversitiesT[];
}

const SelectUniversity = <T extends FieldValues>({
  register,
  fieldError,
  fieldId,
  defaultValue,
  isDisabled,
  data,
}: ComponentPropsT<T>) => {
  return (
    <InputFieldStyles $isError={fieldError !== undefined}>
      <InputLabel inputId={fieldId} content={'University'} />
      <select
        {...register(fieldId, {
          required: {
            value: true,
            message: 'Selecting a university is required.',
          },
        })}
        id={fieldId}
        name={fieldId}
        autoComplete={'off'}
        defaultValue={defaultValue}
        disabled={isDisabled}
      >
        <option hidden value={''}>Select the university of your choice.</option>
        {data.map((option: UniversitiesT) => {
          return <option key={option.uuid} value={option.uuid}>{`${option.name} - ${option.abbreviation}`}</option>;
        })}
      </select>
      {fieldError && <ErrorMessage content={fieldError} />}
    </InputFieldStyles>
  );
};

export default SelectUniversity;
