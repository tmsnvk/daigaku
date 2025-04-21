/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/**
 * Defines the structure of the dashboard statistics for Student authenticated users.
 */
export interface StudentDashboardStatisticsResponse {
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
   * The count of submitted applications.
   */
  readonly applicationsCount: number;

  /**
   * The count of 'Planned' status submitted application-records.
   */
  readonly plannedApplicationsCount: number;

  /**
   * The count of 'Submitted' status submitted application-records.
   */
  readonly submittedApplicationsCount: number;

  /**
   * The count of 'Withdrawn' status submitted application-records.
   */
  readonly withdrawnStatusCount: number;

  /**
   * The count of distinct countries the user has submitted an application-record to.
   */
  readonly distinctCountriesCount: number;

  /**
   * The count of distinct universities the user has submitted an application-record to.
   */
  readonly distinctUniversitiesCount: number;

  /**
   * The count of application-records where the user has not set the 'InterviewStatus' field yet.
   */
  readonly notSetInterviewStatusCount: number;

  /**
   * The count of application-records where the user has set the 'OfferStatus' field to a positive outcome.
   */
  readonly offersCount: number;
}
