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
 * The interface represents the return value properties of the {@link useSelectCountry} custom hook.
 *
 * @since 0.0.1
 */
export interface SelectCountry {
  handleCountrySelection: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

/**
 * The custom hook manages the component's country selection callback method.
 *
 * @returns {SelectCountry} An object containing:
 * - `handleCountrySelection`: A function to manage dropdown value changes.
 *
 * @since 0.0.1
 */
export const useSelectCountry = (onCountrySelection: (countryUuid: string) => void): SelectCountry => {
  const handleCountrySelection = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    onCountrySelection(event.target.value);
  };

  return {
    handleCountrySelection,
  };
};
