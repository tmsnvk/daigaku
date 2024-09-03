/**
 * @prettier
 */

/* external imports */
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

/* component, style imports */
import { BaseInput } from '@components/base-styles';
import { InputError, InputLabel } from '@components/form';

/* interface, type, enum imports */
import { UniversityOption } from '@services/support/university.service';

/* interfaces, types, enums */
interface ComponentProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  fieldError: string | undefined;
  fieldId: Path<T>;
  isDisabled: boolean;
  universityOptions: Array<UniversityOption>;
}

/*
 * component - TODO - add functionality description
 */
export const SelectUniversity = <T extends FieldValues>({
  register,
  fieldError,
  fieldId,
  isDisabled,
  universityOptions,
}: ComponentProps<T>) => {
  return (
    <BaseInput $isError={fieldError !== undefined}>
      <InputLabel
        id={fieldId}
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
        {universityOptions.map((universityOption: UniversityOption) => (
          <option
            key={universityOption.uuid}
            value={universityOption.uuid}
          >
            {`${universityOption.name} - ${universityOption.abbreviation}`}
          </option>
        ))}
      </select>
      {fieldError && <InputError errorText={fieldError} />}
    </BaseInput>
  );
};
