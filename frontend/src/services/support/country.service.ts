/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* logic imports */
import { apiClient } from '@daigaku/utilities';

/* configuration, constants imports */
import { axiosConfigWithAuth } from '@daigaku/configuration';

/* interface, type imports */
import { CountryOptionResponse } from '@daigaku/common-types';

/**
 * Defines country-related operations, handling API requests and interactions for country management.
 */
interface CountryService {
  /**
   * Retrieves all country options.
   *
   * @return {Promise<Array<CountryOptionResponse>>}
   *
   * @throws {UnauthorizedError} If the user enters incorrect form data, i.e. email/password pair do not match or the
   *   user does not have valid token.
   * @throws {ServerError} If the server fails unexpectedly.
   * @throws {UnexpectedError} For any non-Axios or unrecognized error.
   */
  findOptionList: () => Promise<Array<CountryOptionResponse>>;
}

/**
 * Manages country-related REST API operations, implementing {@link CountryService}.
 */
export const countryService: CountryService = {
  findOptionList: (): Promise<Array<CountryOptionResponse>> => {
    return apiClient.serviceWrapper(() =>
      axiosConfigWithAuth.request<Array<CountryOptionResponse>>({
        method: 'GET',
        url: '/api/v1/countries/options',
      }),
    );
  },
};
