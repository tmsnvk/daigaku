/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { useState } from 'react';

/**
 * Defines the return value properties for managing country selection functionality.
 */
export interface CountrySelection {
  /**
   * Indicates if a country is selected.
   */
  readonly isCountrySelected: boolean;

  /**
   * The currently selected country's UUID.
   */
  readonly currentCountryUuid: string;

  /**
   * A method to update the selected country using a given uuid string.
   *
   * @param countryUuid The to-be-selected country's uuid string.
   */
  selectCountry: (countryUuid: string) => void;

  /**
   * A method to reset the country selection status.
   */
  resetCountrySelection: () => void;
}

/**
 * Manages the state of country selection. It tracks whether a country has been selected
 * and stores the currently selected country's uuid.
 *
 * @return {CountrySelection} The object that manages the country selection state.
 */
export const useCountrySelection = (): CountrySelection => {
  const [isCountrySelected, setIsCountrySelected] = useState<boolean>(false);
  const [currentCountryUuid, setCurrentCountryUuid] = useState<string>('');

  const selectCountry = (countryUuid: string): void => {
    setIsCountrySelected(true);
    setCurrentCountryUuid(countryUuid);
  };

  const resetCountrySelection = (): void => {
    setIsCountrySelected(false);
  };

  return {
    isCountrySelected,
    currentCountryUuid,
    selectCountry,
    resetCountrySelection,
  };
};
