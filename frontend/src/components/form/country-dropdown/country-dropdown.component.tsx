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
import { CoreInputError, CoreInputLabel } from '@components/form';

/* configuration, utilities, constants imports */
import { localization as l } from '@constants';

/* interface, type, enum imports */
import { CountryOption, DropdownInput } from '@common-types';
import { CoreInputGroupWrapper } from '@components/form/core-input-group-wrapper';

/**
 * Defines the component's properties.
 *
 * @template T - The type of form values extending the `react-hook-form` library.
 */
interface ComponentProps<T extends FieldValues, CountryOption> extends DropdownInput<T, CountryOption> {
  /**
   * A callback invoked when a country is selected.
   */
  onCountrySelection: (event: string) => void;
}

/**
 * Renders a dropdown component to select a {@link CountryOption} value.
 *
 * @param {ComponentProps<T extends FieldValues, CountryOption>} props
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
}: ComponentProps<T, CountryOption>): JSX.Element => {
  const { handleCountrySelection } = useSelectCountry(onCountrySelection);

  return (
    <CoreInputGroupWrapper>
      <CoreInputLabel
        inputId={id}
        content={l.COMPONENTS.FORM.COUNTRY_DROPDOWN.LABEL}
      />
      <select
        {...register(id, validationRules)}
        id={id}
        name={id}
        disabled={isDisabled}
        onBlur={handleCountrySelection}
      >
        <option
          hidden
          value={''}
        >
          {l.COMPONENTS.FORM.COUNTRY_DROPDOWN.DEFAULT_OPTION}
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
      {error && <CoreInputError message={error} />}
    </CoreInputGroupWrapper>
  );
};
