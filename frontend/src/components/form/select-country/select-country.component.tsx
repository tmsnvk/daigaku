/**
 * @prettier
 */

/* external imports */
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

/* component, style imports */
import { BaseInput } from '@components/base-styles';
import { InputError, InputLabel } from '@components/form';

/* interface, type, enum imports */
import { CountryOption } from '@services/support/country.service';

/* interfaces, types, enums */
interface ComponentProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  fieldError: string | undefined;
  fieldId: Path<T>;
  isDisabled: boolean;
  options: Array<CountryOption>;
  onCountrySelection: (event: string) => void;
}

/*
 * component - TODO - add functionality description
 */
export const SelectCountry = <T extends FieldValues>({
  register,
  fieldError,
  fieldId,
  isDisabled,
  options,
  onCountrySelection,
}: ComponentProps<T>) => {
  return (
    <BaseInput $isError={fieldError !== undefined}>
      <InputLabel
        fieldId={fieldId}
        content={'Country'}
      />
      <select
        {...register(fieldId, {
          required: {
            value: true,
            message: 'Selecting a country is required.',
          },
          onChange: (event) => {
            onCountrySelection(event.target.value);
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
          Select the country of your choice.
        </option>
        {options.map((countryOption: CountryOption) => (
          <option
            key={countryOption.uuid}
            value={countryOption.uuid}
          >
            {countryOption.name}
          </option>
        ))}
      </select>
      {fieldError && <InputError errorText={fieldError} />}
    </BaseInput>
  );
};
