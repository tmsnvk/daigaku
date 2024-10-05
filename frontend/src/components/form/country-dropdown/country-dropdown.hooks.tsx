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

/* interfaces, types, enums */
export interface SelectCountry {
  handleCountrySelection: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

interface SelectCountryParams {
  onCountrySelection: (countryUuid: string) => void;
}

/**
 * @description
 * The custom hook manages the component's country selection callback method.
 *
 * @returns {SelectCountry} An object containing:
 * - `handleCountrySelection` A callback method that has the selected country's uuid as its parameter.
 *
 * @since 0.0.1
 */
export const useSelectCountry = ({ onCountrySelection }: SelectCountryParams): SelectCountry => {
  const handleCountrySelection = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    onCountrySelection(event.target.value);
  };

  return {
    handleCountrySelection,
  };
};
