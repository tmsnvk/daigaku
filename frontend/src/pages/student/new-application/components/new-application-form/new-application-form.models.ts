/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/**
 * Defines the return value properties for managing country selection functionality.
 */
export interface CountrySelection {
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

  /**
   * Indicates if a country is selected.
   */
  readonly isCountrySelected: boolean;

  /**
   * The currently selected country's UUID.
   */
  readonly currentCountryUuid: string;
}
