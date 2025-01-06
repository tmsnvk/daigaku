/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/**
 * Defines properties for handling country option selection behavior in dropdown components.
 */
export interface SelectCountry {
  /**
   * A callback method invoked when the country dropdown value changes.
   */
  handleCountrySelection: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
