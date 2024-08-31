/**
 * @prettier
 */

/* external imports */
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

/* component, style imports */
import { BaseInput } from '@components/base-styles';
import { InputError, InputLabel } from '@components/form';

/* interface, type, enum imports */
import { InstitutionOption } from '@services/support/institution.service';

/* interfaces, types, enums */
interface ComponentProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  fieldError: string | undefined;
  fieldId: Path<T>;
  isDisabled: boolean;
  institutionOptions: Array<InstitutionOption>;
}

/*
 * component - TODO - add functionality description
 */
export const SelectInstitution = <T extends FieldValues>({
  register,
  fieldError,
  fieldId,
  isDisabled,
  institutionOptions,
}: ComponentProps<T>) => {
  return (
    <BaseInput $isError={fieldError !== undefined}>
      <InputLabel
        fieldId={fieldId}
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
        {institutionOptions.map((institutionOption: InstitutionOption) => (
          <option
            key={institutionOption.uuid}
            value={institutionOption.uuid}
          >
            {institutionOption.name}
          </option>
        ))}
      </select>
      {fieldError && <InputError message={fieldError} />}
    </BaseInput>
  );
};
