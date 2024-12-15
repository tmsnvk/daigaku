/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/**
 * ===============
 * Custom Hook {@link useSelectCountry}
 * ===============
 */

/**
 * Defines the return value properties of the {@link useSelectCountry} custom hook.
 *
 * @since 0.0.1
 */
export interface SelectCountry {
  /**
   * Callback invoked when the country dropdown value changes.
   */
  handleCountrySelection: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

/**
 * Manages the country selection callback method.
 *
 * @param onCountrySelection Callback invoked with the selected country's uuid.
 * @return {SelectCountry}
 *
 * @since 0.0.1
 */
export const useSelectCountry = (onCountrySelection: (countryUuid: string) => void): SelectCountry => {
  // Handles the change event for the country dropdown and calls the callback with the selected value.
  const handleCountrySelection = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const selectedValue: string = event.target.value;

    if (selectedValue) {
      onCountrySelection(selectedValue);
    }
  };

  return {
    handleCountrySelection,
  };
};
