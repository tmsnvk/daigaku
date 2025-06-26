/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { ChangeEvent, useState } from 'react';

/* configuration, constants imports */
import { isEmpty } from '@daigaku/utilities';

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
  handleCountrySelection: (event: ChangeEvent<HTMLSelectElement>) => void;

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

  const handleCountrySelection = (event: ChangeEvent<HTMLSelectElement>): void => {
    if (!isEmpty(event.target.value)) {
      setIsCountrySelected(true);
      setCurrentCountryUuid(event.target.value);
    }
  };

  const resetCountrySelection = (): void => {
    setIsCountrySelected(false);
  };

  return {
    isCountrySelected,
    currentCountryUuid,
    handleCountrySelection,
    resetCountrySelection,
  };
};
