/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/**
 * Defines the {@link useGetDashboardStatistics} custom hook's return value properties.
 */
export interface DashboardStatistics {
  readonly firmChoiceTileDetails: {
    countryName: string;
    universityName: string;
    courseName: string;
  };
  readonly finalDestinationTileDetails: {
    countryName: string;
    universityName: string;
    courseName: string;
  };
  readonly applicationsCount: number;
  readonly plannedApplicationsCount: number;
  readonly submittedApplicationsCount: number;
  readonly withdrawnStatusCount: number;
  readonly distinctCountriesCount: number;
  readonly distinctUniversitiesCount: number;
  readonly notSetInterviewStatusCount: number;
  readonly offersCount: number;
}
