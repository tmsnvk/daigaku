/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { AxiosResponse } from 'axios';

/* configuration, utilities, constants imports */
import { axiosConfigWithAuth } from '@daigaku/configuration';

/* interface, type, enum, schema imports */
import { ApplicationRecord, StudentDashboardStatisticsResponse } from '@daigaku/common-types';

/**
 * Defines generic-application operations, handling API requests and interactions for application management.
 */
interface ApplicationService {
  /**
   * Retrieves a specific application by its uuid.
   *
   * @param applicationUuid The application's uuid.
   * @return {Promise<ApplicationRecord>}
   * @throws {AxiosError}
   */
  getByUuid: (applicationUuid: string) => Promise<ApplicationRecord>;

  /**
   * Fetches a list of applications accessible based on the user's authorization role.
   *
   * @param accountRole The user's authorisation role.
   * @return {Promise<Array<ApplicationRecord>>}
   * @throws {AxiosError}
   */
  getAllByRole: (roleResource: string) => Promise<Array<ApplicationRecord>>;

  /**
   * Retrieves dashboard statistics relevant to the user's authorization role.
   *
   * @param accountRole The user's authorisation role.
   * @return {Promise<StudentDashboardStatisticsResponse>}
   * @throws {AxiosError}
   */
  getDashboardStatistics: (roleResource: string) => Promise<StudentDashboardStatisticsResponse>;
}

/**
 * Manages application-related REST API operations, implementing {@link ApplicationService}.
 */
export const applicationService: ApplicationService = {
  getByUuid: async (applicationUuid: string): Promise<ApplicationRecord> => {
    const { data } = await axiosConfigWithAuth.request<ApplicationRecord>({
      method: 'GET',
      url: `/api/v1/applications/${applicationUuid}`,
    });

    return data;
  },
  getAllByRole: async (accountRole: string): Promise<Array<ApplicationRecord>> => {
    const response: AxiosResponse<Array<ApplicationRecord>> = await axiosConfigWithAuth.request<
      Array<ApplicationRecord>
    >({
      method: 'GET',
      url: `/api/v1/applications/${accountRole}`,
    });

    return response.data;
  },
  getDashboardStatistics: async (accountRole: string): Promise<StudentDashboardStatisticsResponse> => {
    const response: AxiosResponse<StudentDashboardStatisticsResponse> =
      await axiosConfigWithAuth.request<StudentDashboardStatisticsResponse>({
        method: 'GET',
        url: `/api/v1/applications/${accountRole}/dashboard`,
      });

    return response.data;
  },
};
