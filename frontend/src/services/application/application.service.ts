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

/* external imports */
import { AxiosResponse } from 'axios';

/* configuration, utilities, constants imports */
import { axiosConfigWithAuth } from '@configuration';

/* interface, type, enum imports */
import { Application } from '@common-types';
import { DashboardStatistics } from '@pages/common/dashboard/dashboard.hooks';

/**
 * ===============
 * Service API Calls {@link applicationService}
 * ===============
 */

/**
 * Defines the operations of the {@link applicationService} object, responsible for managing application-related API requests.
 *
 * @since 0.0.1
 */
interface ApplicationService {
  /**
   * Retrieves a specific application by its uuid.
   *
   * @param applicationUuid The application's uuid.
   * @return {Promise<Application>}
   * @throws {AxiosError}
   */
  getByUuid: (applicationUuid: string) => Promise<Application>;

  /**
   * Fetches a list of applications accessible based on the user's authorization role.
   *
   * @param accountRole The user's authorisation role.
   * @return {Promise<Array<Application>>}
   * @throws {AxiosError}
   *
   * @since 0.0.1
   */
  getAllByRole: (roleResource: string) => Promise<Array<Application>>;

  /**
   * Retrieves dashboard statistics relevant to the user's authorization role.
   *
   * @param accountRole The user's authorisation role.
   * @return {Promise<DashboardStatistics>}
   * @throws {AxiosError}
   *
   * @since 0.0.1
   */
  getDashboardStatistics: (roleResource: string) => Promise<DashboardStatistics>;
}

/**
 * Manages application-related REST API operations, implementing {@link ApplicationService}.
 *
 * @since 0.0.1
 */
export const applicationService: ApplicationService = {
  getByUuid: async (applicationUuid: string): Promise<Application> => {
    const { data } = await axiosConfigWithAuth.request<Application>({
      method: 'GET',
      url: `/api/v1/applications/${applicationUuid}`,
    });

    return data;
  },
  getAllByRole: async (accountRole: string): Promise<Array<Application>> => {
    const response: AxiosResponse<Array<Application>> = await axiosConfigWithAuth.request<Array<Application>>({
      method: 'GET',
      url: `/api/v1/applications/${accountRole}`,
    });

    return response.data;
  },
  getDashboardStatistics: async (accountRole: string): Promise<DashboardStatistics> => {
    const response: AxiosResponse<DashboardStatistics> = await axiosConfigWithAuth.request<DashboardStatistics>({
      method: 'GET',
      url: `/api/v1/applications/${accountRole}/dashboard`,
    });

    return response.data;
  },
};
