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
 * Manages the country selection callback method.
 *
 * @param onCountrySelection Callback invoked with the selected country's uuid.
 * @return {SelectCountry}
 */
export const useSelectCountry = (onCountrySelection: (countryUuid: string) => void): SelectCountry => {
  // Handles the change event for the CountryDropdown component and calls the callback with the selected value.
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
