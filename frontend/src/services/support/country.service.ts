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
import { CountryOption } from '@common-types';

/**
 * ===============
 * Service API Calls {@link countryService}
 * ===============
 */

/**
 * Defines the operations of the {@link countryService} object, responsible for managing country-related API requests.
 *
 * @since 0.0.1
 */
interface CountryService {
  /**
   * Retrieves all country options.
   *
   * @return {Promise<Array<CountryOption>>}
   * @throws {AxiosError}
   */
  getAllOptions: () => Promise<Array<CountryOption>>;
}

/**
 * Manages country-related REST API operations, implementing {@link CountryService}.
 *
 * @since 0.0.1
 */
export const countryService: CountryService = {
  getAllOptions: async (): Promise<Array<CountryOption>> => {
    const response: AxiosResponse<Array<CountryOption>> = await axiosConfigWithAuth.request<Array<CountryOption>>({
      method: 'GET',
      url: 'api/v1/countries/options',
    });

    return response.data;
  },
};
