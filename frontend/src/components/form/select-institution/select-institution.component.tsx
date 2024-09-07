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
  id: Path<T>;
  isDisabled: boolean;
  institutions: Array<InstitutionOption>;
}

/*
 * component - TODO - add functionality description
 */
export const SelectInstitution = <T extends FieldValues>({ register, fieldError, id, isDisabled, institutions }: ComponentProps<T>) => {
  return (
    <BaseInput $isError={fieldError !== undefined}>
      <InputLabel
        fieldId={id}
        content={'Institution'}
      />
      <select
        {...register(id, {
          required: {
            value: true,
            message: 'Selecting an institution is required.',
          },
        })}
        id={id}
        name={id}
        disabled={isDisabled}
      >
        <option
          hidden
          value={''}
        >
          Select the institution you currently attend.
        </option>
        {institutions.map((institution: InstitutionOption) => (
          <option
            key={institution.uuid}
            value={institution.uuid}
          >
            {institution.name}
          </option>
        ))}
      </select>
      {fieldError && <InputError errorText={fieldError} />}
    </BaseInput>
  );
};
