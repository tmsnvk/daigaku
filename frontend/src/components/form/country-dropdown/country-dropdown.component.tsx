/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 */

/* external imports */
import { FieldValues } from 'react-hook-form';

/* logic imports */
import { SelectCountry, useSelectCountry } from './country-dropdown.hooks';

/* component, style imports */
import { BaseInput } from '@components/base-styles';
import { InputError, InputLabel } from '@components/form';

/* configuration, utilities, constants imports */
import { constants } from './country-dropdown.constants';

/* interface, type, enum imports */
import { CountryOption, DropdownInput } from '@common-types';

/**
 * ===============
 * Component {@link CountryDropdown}
 * ===============
 */

/**
 * Defines the properties of the {@link CountryDropdown} component.
 *
 * @template T - The type of form values extending the `react-hook-form` library.
 * @template U - The type of options available in the dropdown.
 *
 * @since 0.0.1
 */
interface ComponentProps<T extends FieldValues, U> extends DropdownInput<T, U> {
  /**
   * Callback invoked when a country is selected.
   */
  onCountrySelection: (event: string) => void;
}

/**
 * Renders a dropdown component to select a {@link CountryOption} value.
 *
 * @param {ComponentProps<T extends FieldValues>} props
 * @return {JSX.Element}
 *
 * @since 0.0.1
 */
export const CountryDropdown = <T extends FieldValues>({
  register,
  validationRules,
  error,
  id,
  isDisabled,
  options,
  onCountrySelection,
}: ComponentProps<T, CountryOption>): JSX.Element => {
  // Custom hook that handles the country selection logic.
  const { handleCountrySelection }: SelectCountry = useSelectCountry(onCountrySelection);

  return (
    <BaseInput $isError={error !== undefined}>
      <InputLabel
        inputId={id}
        labelText={constants.ui.dropdown.LABEL_TEXT}
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
