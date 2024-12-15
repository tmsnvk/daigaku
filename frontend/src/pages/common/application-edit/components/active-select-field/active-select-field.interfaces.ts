/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* interface, type, enum imports */
import { ApplicationStatus, FinalDestinationStatus, InterviewStatus, OfferStatus, ResponseStatus } from '@common-types';

/**
 * Defines the possible application status option types.
 *
 * @since 0.0.1
 */
export type SelectOptions = ApplicationStatus | InterviewStatus | OfferStatus | ResponseStatus | FinalDestinationStatus;
