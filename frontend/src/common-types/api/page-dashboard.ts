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
   * Details of the Application that is set to Firm Choice.
   */
  readonly firmChoiceTileDetails: {
    countryName: string;
    universityName: string;
    courseName: string;
  };

  /**
   * Details of the Application that is set to Final Destination.
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
   * The count of 'Planned' status submitted Application.
   */
  readonly plannedApplicationsCount: number;

  /**
   * The count of 'Submitted' status submitted Application.
   */
  readonly submittedApplicationsCount: number;

  /**
   * The count of 'Withdrawn' status submitted Application.
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
   * The count of Application where the user has not set the 'InterviewStatus' field yet.
   */
  readonly notSetInterviewStatusCount: number;

  /**
   * The count of Application where the user has set the 'OfferStatus' field to a positive outcome.
   */
  readonly offersCount: number;
}
