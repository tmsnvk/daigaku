/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { AxiosError } from 'axios';

/* interface, type, enum imports */
import { Application, CoreErrorResponse, CreateApplicationFormFields, MutationResult } from '@common-types';

/**
 * Defines the {@link useCreateApplication} custom hook's return value properties.
 */
export type CreateApplication = MutationResult<Application, AxiosError<CoreErrorResponse>, CreateApplicationFormFields>;

/**
 * Defines the {@link useCountrySelection} custom hook's return value properties.
 */
export interface CountrySelection {
  /**
   * A function to update the selected country using a given UUID.
   * @param countryUuid The to be selected country's UUID.
   */
  selectCountry: (countryUuid: string) => void;

  /**
   * A function to reset the country selection status.
   */
  resetCountrySelection: () => void;

  /**
   * Indicates if a country is selected.
   */
  isCountrySelected: boolean;

  /**
   * The currently selected country's UUID.
   */
  currentCountryUuid: string;
}
