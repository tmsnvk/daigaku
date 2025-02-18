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
 * Handles the component's onChange event and calls the callback method with the selected value.
 *
 * @param onCountrySelection A callback method called with the selected country option's uuid string.
 * @return {SelectCountry}
 */
export const useSelectCountry = (onCountrySelection: (countryUuid: string) => void): SelectCountry => {
  const handleCountrySelection = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const selectedValue = event.target.value;

    if (!isEmpty(selectedValue)) {
      onCountrySelection(selectedValue);
    }
  };

  return {
    handleCountrySelection,
  };
};
