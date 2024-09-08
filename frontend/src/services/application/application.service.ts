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

/* interfaces, types, enums */
interface ApplicationService {
  getByUuid: (applicationUuid: string) => Promise<Application>;
  getAllByRole: (roleResource: string) => Promise<Array<Application>>;
  getDashboardStatistics: (roleResource: string) => Promise<DashboardStatistics>;
}

/**
 * @description
 * The service manages application-related REST API operations.
 *
 * @property {Function} getByUuid
 * @property {Function} getAllByRole
 * @property {Function} getDashboardStatistics
 *
 * @since 0.0.1
 */
export const applicationService: ApplicationService = {
  /*
   * TODO - comment
   */
  getByUuid: async (applicationUuid: string): Promise<Application> => {
    const { data } = await axiosConfigWithAuth.request<Application>({
      method: 'GET',
      url: `/api/v1/applications/${applicationUuid}`,
    });

    return data;
  },
  /**
   * @description
   * The method sends a GET request to fetch a list of Application objects based on the user's authorisation.
   *
   * @param {string} accountRole
   * The user's authorisation.
   *
   * @returns {Promise<Array<Application>>}
   * A promise that resolves when the request is successfully sent.
   *
   * @throws {AxiosError}
   * Throws an error if the request fails.
   *
   * @since 0.0.1
   */
  getAllByRole: async (accountRole: string): Promise<Array<Application>> => {
    const response: AxiosResponse<Array<Application>> = await axiosConfigWithAuth.request<Array<Application>>({
      method: 'GET',
      url: `/api/v1/applications/${accountRole}`,
    });

    return response.data;
  },
  /**
   * @description
   * The method sends a GET request to fetch dashboard-related statistics based on the user's authorisation.
   *
   * @param {string} accountRole
   * The user's authorisation.
   *
   * @returns {Promise<DashboardStatistics>}
   * A promise that resolves when the request is successfully sent.
   *
   * @throws {AxiosError}
   * Throws an error if the request fails.
   *
   * @since 0.0.1
   */
  getDashboardStatistics: async (accountRole: string): Promise<DashboardStatistics> => {
    const response: AxiosResponse<DashboardStatistics> = await axiosConfigWithAuth.request<DashboardStatistics>({
      method: 'GET',
      url: `/api/v1/applications/${accountRole}/dashboard`,
    });

    return response.data;
  },
};
