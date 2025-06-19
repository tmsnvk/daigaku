/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* configuration, utilities, constants imports */
import { axiosConfigWithAuth } from '@daigaku/configuration';
import { apiClientWrapper } from '@daigaku/utilities';

/* interface, type imports */
import { UniversityOption } from '@daigaku/common-types';

/**
 * Defines university-related operations, handling API requests and interactions for university management.
 */
interface UniversityService {
  /**
   * Retrieves all university options for a specific country identified by its uuid.
   *
   * @param countryUuid The selected country's uuid.
   * @return {Promise<Array<UniversityOption>>}
   *
   * @throws {UnauthorizedError} If the user enters incorrect form data, i.e. email/password pair do not match or the
   *   user does not have valid token.
   * @throws {ServerError} If the server fails unexpectedly.
   * @throws {UnexpectedError} For any non-Axios or unrecognized error.
   */
  findOptionListByCountryUuid: (countryUuid: string) => Promise<Array<UniversityOption>>;
}

/**
 * Manages university-related REST API operations, implementing {@link UniversityService}.
 */
export const universityService: UniversityService = {
  findOptionListByCountryUuid: (countryUuid: string): Promise<Array<UniversityOption>> => {
    return apiClientWrapper(() =>
      axiosConfigWithAuth.request<Array<UniversityOption>>({
        method: 'GET',
        url: `api/v1/universities/options/${countryUuid}`,
      }),
    );
  },
};
