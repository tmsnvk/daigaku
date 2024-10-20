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

/**
 * ===============
 * Custom Hook {@link useSelectCountry}
 * ===============
 */

/**
 * Represents the return value properties of the {@link useSelectCountry} custom hook.
 *
 * @since 0.0.1
 */
export interface SelectCountry {
  /**
   * A function to manage the dropdown value changes.
   */
  handleCountrySelection: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

/**
 * The custom hook manages the country selection callback method.
 *
 * @param onCountrySelection A callback function that receives the selected country uuid.
 * @returns {SelectCountry}
 *
 * @since 0.0.1
 */
export const useSelectCountry = (onCountrySelection: (countryUuid: string) => void): SelectCountry => {
  const handleCountrySelection = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    // Handles the change event for the country dropdown and calls the callback with the selected value.
    const selectedValue: string = event.target.value;

    if (selectedValue) {
      onCountrySelection(selectedValue);
    }
  };

  return {
    handleCountrySelection,
  };
};
