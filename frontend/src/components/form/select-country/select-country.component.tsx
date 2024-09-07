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
  countryOptions: Array<CountryOption>;
  onCountryClick: (event: string) => void;
  onCountrySelection: () => void;
}

/*
 * component - TODO - add functionality description
 */
export const SelectCountry = <T extends FieldValues>({
  register,
  fieldError,
  fieldId,
  isDisabled,
  countryOptions,
  onCountryClick,
  onCountrySelection,
}: ComponentProps<T>) => {
  return (
    <BaseInput $isError={fieldError !== undefined}>
      <InputLabel
        id={fieldId}
        content={'Country'}
      />
      <select
        {...register(fieldId, {
          required: {
            value: true,
            message: 'Selecting a country is required.',
          },
          onChange: (event) => {
            onCountryClick(event.target.value);
            onCountrySelection();
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
        {countryOptions.map((countryOption: CountryOption) => (
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
