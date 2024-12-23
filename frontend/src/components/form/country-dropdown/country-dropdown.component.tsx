/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { FieldValues } from 'react-hook-form';

/* logic imports */
import { useSelectCountry } from './country-dropdown.hooks';

/* component, style imports */
import { BaseInput } from '@components/base-styles';
import { InputError, InputLabel } from '@components/form';

/* configuration, utilities, constants imports */
import { constants } from './country-dropdown.constants';

/* interface, type, enum imports */
import { CountryOption, DropdownInput } from '@common-types';
import { SelectCountry } from './country-dropdown.models';

/**
 * Defines the properties of the {@link CountryDropdown} component.
 *
 * @template T - The type of form values extending the `react-hook-form` library.
 */
interface ComponentProps<T extends FieldValues> extends DropdownInput<T, CountryOption> {
  /**
   * A callback invoked when a country is selected.
   */
  onCountrySelection: (event: string) => void;
}

/**
 * Renders a dropdown component to select a {@link CountryOption} value.
 *
 * @param {ComponentProps<T extends FieldValues>} props
 * @return {JSX.Element}
 */
export const CountryDropdown = <T extends FieldValues>({
  register,
  validationRules,
  error,
  id,
  isDisabled,
  options,
  onCountrySelection,
}: ComponentProps<T>): JSX.Element => {
  const { handleCountrySelection }: SelectCountry = useSelectCountry(onCountrySelection);

  return (
    <BaseInput $isError={error !== undefined}>
      <InputLabel
        inputId={id}
        labelText={constants.ui.dropdown.LABEL}
      />
      <select
        {...register(id, validationRules)}
        onChange={handleCountrySelection}
        id={id}
        name={id}
        disabled={isDisabled}
      >
        <option
          hidden
          value={''}
        >
          {constants.ui.dropdown.DEFAULT_OPTION}
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
      {error && <InputError message={error} />}
    </BaseInput>
  );
};
