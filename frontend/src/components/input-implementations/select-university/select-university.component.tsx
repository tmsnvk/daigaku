/**
 * @prettier
 */

import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

import { BaseInput } from '@components/base-styles';
import { InputError, InputLabel } from '@components/form';

import { UniversityOption } from '@services/support/university.service';

interface ComponentProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  fieldError: string | undefined;
  fieldId: Path<T>;
  isDisabled: boolean;
  data: UniversityOption[];
}

export const SelectUniversity = <T extends FieldValues>({
  register,
  fieldError,
  fieldId,
  isDisabled,
  data,
}: ComponentProps<T>) => {
  return (
    <BaseInput $isError={fieldError !== undefined}>
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
        <option
          hidden
          value={''}
        >
          Select the university of your choice.
        </option>
        {data.map((option: UniversityOption) => {
          return (
            <option
              key={option.uuid}
              value={option.uuid}
            >
              {`${option.name} - ${option.abbreviation}`}
            </option>
          );
        })}
      </select>
      {fieldError && <InputError content={fieldError} />}
    </BaseInput>
  );
};
