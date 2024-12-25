/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* configuration, utilities, constants imports */
import { isEmpty } from '@utilities';

/* interface, type, enum imports */
import { SelectCountry } from './country-dropdown.models';

/**
 * Handles the change event for the CountryDropdown component and calls the callback with the selected value.
 *
 * @param onCountrySelection A callback method called with the selected country option's uuid string.
 * @return {SelectCountry}
 */
export const useSelectCountry = (onCountrySelection: (countryUuid: string) => void): SelectCountry => {
  const handleCountrySelection = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const selectedValue: string = event.target.value;

    if (!isEmpty(selectedValue)) {
      onCountrySelection(selectedValue);
    }
  };

  return {
    handleCountrySelection,
  };
};
