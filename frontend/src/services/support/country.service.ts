/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* configuration, utilities, constants imports */
import { axiosConfigWithAuth } from '@daigaku/configuration';
import { apiClientWrapper } from '@daigaku/utilities';

/* interface, type, enum, schema imports */
import { CountryOption } from '@daigaku/common-types';

/**
 * Defines country-related operations, handling API requests and interactions for country management.
 */
interface CountryService {
  /**
   * Retrieves all country options.
   *
   * @return {Promise<Array<CountryOption>>}
   *
   * @throws {UnauthorizedError} If the user enters incorrect form data, i.e. email/password pair do not match or the
   *   user does not have valid token.
   * @throws {ServerError} If the server fails unexpectedly.
   * @throws {UnexpectedError} For any non-Axios or unrecognized error.
   */
  getAllOptions: () => Promise<Array<CountryOption>>;
}

/**
 * Manages country-related REST API operations, implementing {@link CountryService}.
 */
export const countryService: CountryService = {
  getAllOptions: (): Promise<Array<CountryOption>> => {
    return apiClientWrapper(() =>
      axiosConfigWithAuth.request<Array<CountryOption>>({
        method: 'GET',
        url: 'api/v1/countries/options',
      }));
  },
};
