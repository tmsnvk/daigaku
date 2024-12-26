/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/**
 * Defines the dashboard statistics object for Student authenticated users.
 */
export interface StudentDashboardStatistics {
  /**
   * Details of the application that is set to Firm Choice.
   */
  readonly firmChoiceTileDetails: {
    countryName: string;
    universityName: string;
    courseName: string;
  };

  /**
   * Details of the application that is set to Final Destination.
   */
  readonly finalDestinationTileDetails: {
    countryName: string;
    universityName: string;
    courseName: string;
  };

  /**
   * The count of Applications submitted by the user.
   */
  readonly applicationsCount: number;

  /**
   * The count of 'Planned' status Applications submitted by the user.
   */
  readonly plannedApplicationsCount: number;

  /**
   * The count of 'Submitted' status Applications submitted by the user.
   */
  readonly submittedApplicationsCount: number;

  /**
   * The count of 'Withdrawn' status Applications submitted by the user.
   */
  readonly withdrawnStatusCount: number;

  /**
   * The count of distinct countries the user has submitted an Application to.
   */
  readonly distinctCountriesCount: number;

  /**
   * The count of distinct universities the user has submitted an Application to.
   */
  readonly distinctUniversitiesCount: number;

  /**
   * The count of Applications where the user has not set the 'InterviewStatus' field yet.
   */
  readonly notSetInterviewStatusCount: number;

  /**
   * The count of Applications where the user has set the 'OfferStatus' field to a positive outcome.
   */
  readonly offersCount: number;
}
