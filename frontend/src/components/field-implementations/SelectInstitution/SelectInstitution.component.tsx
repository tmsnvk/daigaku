import {
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';
import {
  InputError,
  InputFieldStyles,
  InputLabel,
} from '@components/form';
import { InstitutionOptionT } from '@services/support/institution.service.ts';

type ComponentPropsT<T extends FieldValues> = {
  register: UseFormRegister<T>,
  fieldError: string | undefined;
  fieldId: Path<T>;
  isDisabled: boolean;
  data: InstitutionOptionT[];
}

const SelectInstitution = <T extends FieldValues>({ register, fieldError, fieldId, isDisabled, data }: ComponentPropsT<T>) => {
  return (
    <InputFieldStyles $isError={fieldError !== undefined}>
      <InputLabel inputId={fieldId} content={'Institution'} />
      <select
        {...register(fieldId, {
          required: {
            value: true,
            message: 'Selecting an institution is required.',
          },
        })}
        id={fieldId}
        name={fieldId}
        disabled={isDisabled}
      >
        <option hidden value={''}>Select the institution you currently attend.</option>
        {data.map((option: InstitutionOptionT) => {
          return <option key={option.uuid} value={option.uuid}>{option.name}</option>;
        })}
      </select>
      {fieldError && <InputError content={fieldError} />}
    </InputFieldStyles>
  );
};

export default SelectInstitution;
