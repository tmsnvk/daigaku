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
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

/* logic imports */
import { SelectCountry, useSelectCountry } from './country-dropdown.hooks';

/* component, style imports */
import { BaseInput } from '@components/base-styles';
import { InputError, InputLabel } from '@components/form';

/* configuration, utilities, constants imports */
import { constants } from './country-dropdown.constants';

/* interface, type, enum imports */
import { FormFieldValidation } from '@common-types';
import { CountryOption } from '@services/support/country.service';

/**
 * ===============
 * Component {@link CountryDropdown}
 * ===============
 */

/**
 * The interface represents the properties of the {@link CountryDropdown} component.
 *
 * @since 0.0.1
 */
interface ComponentProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  validationRules?: FormFieldValidation;
  error: string | undefined;
  id: Path<T>;
  isDisabled: boolean;
  options: Array<CountryOption>;
  onCountrySelection: (event: string) => void;
}

/**
 * A dropdown component to select a country.
 *
 * @param {ComponentProps<T extends FieldValues>} props
 * @param props.register `react-hook-form` register method.
 * @param props.validationRules Validation rules for `react-hook-form` validation handling.
 * @param props.error Error message if any.
 * @param props.id The id of the input field.
 * @param props.isDisabled The disabled status of the input field.
 * @param props.options The list of countries that should be available in the dropdown field.
 * @param props.onCountrySelection The callback method that handles logic once a country is selected.
 *
 * @returns {JSX.Element}
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
}: ComponentProps<T>): JSX.Element => {
  const { handleCountrySelection }: SelectCountry = useSelectCountry(onCountrySelection);

  return (
    <BaseInput $isError={error !== undefined}>
      <InputLabel
        inputId={id}
        labelText={constants.input.LABEL_TEXT}
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
          {constants.input.DEFAULT_OPTION}
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
