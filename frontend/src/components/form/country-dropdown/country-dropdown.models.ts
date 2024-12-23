/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/**
 * Defines the return value properties of the {@link useSelectCountry} custom hook.
 */
export interface SelectCountry {
  /**
   * A callback invoked when the country dropdown value changes.
   */
  handleCountrySelection: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
