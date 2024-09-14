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
import { ApplicationStatus } from '@services/status/application-status.service';
import { FinalDestinationStatus } from '@services/status/final-destination-status.service';
import { InterviewStatus } from '@services/status/interview-status-service.service';
import { OfferStatus } from '@services/status/offer-status.service';
import { ResponseStatus } from '@services/status/response-status.service';

/**
 * ===============
 * Custom Hook {@link useGetPreviouslySelectedValue}
 * ===============
 */

/* interfaces, types, enums */
export type SelectOptions = ApplicationStatus | InterviewStatus | OfferStatus | ResponseStatus | FinalDestinationStatus;

/*
 * custom hook - TODO - add functionality description
 */
export const useGetPreviouslySelectedValue = (options: Array<SelectOptions>, previouslySelectedValue: string): SelectOptions => {
  const previousOption: SelectOptions = options?.filter((option: SelectOptions) => option.name === previouslySelectedValue)[0];

  return previousOption;
};
