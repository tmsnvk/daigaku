/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { FieldValues } from 'react-hook-form';

/* component imports */
import { CoreFormElementError, CoreFormElementGroupWrapper, CoreFormElementLabel } from '..';
import { CoreSelectElement } from '../core-element/core-select-element';

/* configuration, utilities, constants imports */
import { localization as l } from '@daigaku/constants';
import { isEmpty } from '@daigaku/utilities';

/* interface, type, enum imports */
import { CoreSelectElementGroup, CountryOption } from '@daigaku/common-types';

/**
 * Defines the component's properties.
 *
 * @template T - The type of form values extending the `react-hook-form` library.
 * @template CountryOption - The type representing representing a country option.
 */
interface CountrySelectGroupProps<T extends FieldValues, CountryOption> extends CoreSelectElementGroup<T, CountryOption> {
  /**
   * The method invoked when a country is selected.
   */
  onCountrySelect: (event: string) => void;

  /**
   * Additional style options.
   */
  readonly className?: string;
}

/**
 * Renders a select element group instance integrated with the `react-hook-form` library to select a
 * {@link CountryOption}.
 *
 * @param {CountrySelectGroupProps<T extends FieldValues, CountryOption>} props
 * @return {JSX.Element}
 */
export const CountrySelectGroup = <T extends FieldValues>({
  validationRules,
  error,
  id,
  isDisabled,
  options,
  onCountrySelect,
  intent,
  className,
}: CountrySelectGroupProps<T, CountryOption>): JSX.Element => {
  const handleOnCountrySelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const selectedValue = event.target.value;

    if (!isEmpty(selectedValue)) {
      onCountrySelect(selectedValue);
    }
  };

  return (
    <CoreFormElementGroupWrapper className={className}>
      <CoreFormElementLabel
        inputId={id}
        content={l.COMPONENTS.FORM.COUNTRY_DROPDOWN.LABEL}
      />
      <CoreSelectElement
        validationRules={validationRules}
        id={id}
        options={options.map((countryOption: CountryOption) => (
          <option
            key={countryOption.uuid}
            value={countryOption.uuid}
          >
            {countryOption.name}
          </option>
        ))}
        defaultOption={l.COMPONENTS.FORM.ACCOUNT_ROLE_DROPDOWN.DEFAULT_OPTION}
        isDisabled={isDisabled}
        isError={error !== undefined}
        onChangeHandler={handleOnCountrySelect}
        intent={intent}
      />
      {error && <CoreFormElementError message={error} />}
    </CoreFormElementGroupWrapper>
  );
};
