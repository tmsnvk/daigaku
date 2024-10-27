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

/* interface, type, enum imports */
import { ApplicationStatus, FinalDestinationStatus, InterviewStatus, OfferStatus, ResponseStatus } from '@common-types';

/**
 * ===============
 * Custom Hook {@link useGetPreviouslySelectedValue}
 * ===============
 */

/**
 * Defines the possible option types.
 *
 * @since 0.0.1
 */
export type SelectOptions = ApplicationStatus | InterviewStatus | OfferStatus | ResponseStatus | FinalDestinationStatus;

/**
 * Retrieves a previously selected value from a list of options.
 * It is necessary to retrieve the previous value's uuid and set it as the input's value.
 *
 * @return {SelectOptions | null} If a previously selected value exists, an object containing `name` and `uuid` fields is returned.
 * Otherwise a null value is returned.
 *
 * @since 0.0.1
 */
export const useGetPreviouslySelectedValue = (
  options: Array<SelectOptions>,
  previouslySelectedValue: string | null,
): SelectOptions | null => {
  if (previouslySelectedValue) {
    const previousOption: SelectOptions = options.filter((option: SelectOptions) => option.name === previouslySelectedValue)[0];

    return previousOption;
  } else {
    return null;
  }
};

/**
 * ===============
 * Custom Hook {@link useOnFieldUpdate}
 * ===============
 */

/**
 * Defines the structure for the field update function returned by {@link useOnFieldUpdate}.
 *
 * @since 0.0.1
 */
export interface FieldUpdate {
  /**
   * Function to handle field update events by retrieving the target value.
   */
  updateField: (event: Event) => void;
}

/**
 * Manages field update events.
 * Captures the value from the event target and passes it to the provided `onFieldUpdate` callback.
 *
 * @param onFieldUpdate Callback function to handle the target value from the field update.
 * @return {FieldUpdate}
 *
 * @since 0.0.1
 */
export const useOnFieldUpdate = (onFieldUpdate: (eventTargetValue: string) => void): FieldUpdate => {
  const updateField = (event: Event) => {
    // Cast event target to HTMLSelectElement.
    const target = event.target as HTMLSelectElement | null;

    if (target) {
      // Passes the selected value to the callback.
      onFieldUpdate(target.value);
    }
  };

  return {
    updateField,
  };
};
