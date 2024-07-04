import {
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';

import { BaseInput } from '@components/base-styles';
import {
  InputError,
  InputLabel,
} from '@components/form';

import { UniversityOptionT } from '@services/support/university.service.ts';

type ComponentPropsT<T extends FieldValues> = {
  register: UseFormRegister<T>,
  fieldError: string | undefined;
  fieldId: Path<T>;
  isDisabled: boolean;
  data: UniversityOptionT[];
}

const SelectUniversity = <T extends FieldValues>({
  register,
  fieldError,
  fieldId,
  isDisabled,
  data,
}: ComponentPropsT<T>) => {
  return (
    <BaseInput
      $isError={fieldError !== undefined}
    >
      <InputLabel
        inputId={fieldId}
        content={'University'}
      />
      <select
        {...register(fieldId, {
          required: {
            value: true,
            message: 'Selecting a university is required.',
          },
        })}
        id={fieldId}
        name={fieldId}
        disabled={isDisabled}
      >
        <option hidden value={''}>Select the university of your choice.</option>
        {data.map((option: UniversityOptionT) => (
          <option key={option.uuid} value={option.uuid}>{`${option.name} - ${option.abbreviation}`}</option>
        ))}
      </select>
      {fieldError && <InputError content={fieldError} />}
    </BaseInput>
  );
};

export default SelectUniversity;
