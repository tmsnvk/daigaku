/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { AxiosResponse } from 'axios';

/* configuration, utilities, constants imports */
import { axiosConfigWithAuth } from '@configuration';

/* interface, type, enum imports */
import { CountryOption } from '@common-types';

/**
 * Defines country-related operations, handling API requests and interactions for country management.
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
