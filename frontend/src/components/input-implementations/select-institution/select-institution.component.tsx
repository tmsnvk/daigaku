/**
 * @prettier
 */

import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

import { BaseInput } from '@components/base-styles';
import { InputError, InputLabel } from '@components/form';

import { InstitutionOption } from '@services/support/institution.service';

interface ComponentProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  fieldError: string | undefined;
  fieldId: Path<T>;
  isDisabled: boolean;
  data: Array<InstitutionOption>;
}

export const SelectInstitution = <T extends FieldValues>({
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
        content={'Institution'}
      />
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
        <option
          hidden
          value={''}
        >
          Select the institution you currently attend.
        </option>
        {data.map((option: InstitutionOption) => (
          <option
            key={option.uuid}
            value={option.uuid}
          >
            {option.name}
          </option>
        ))}
      </select>
      {fieldError && <InputError content={fieldError} />}
    </BaseInput>
  );
};
