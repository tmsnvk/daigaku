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
import { UniversityOptionResponse } from '@daigaku/common-types';

/**
 * Defines university-related operations, handling API requests and interactions for university management.
 */
interface UniversityService {
  /**
   * Retrieves all university options for a specific country identified by its uuid.
   *
   * @param countryUuid The selected country's uuid.
   * @return {Promise<Array<UniversityOptionResponse>>}
   *
   * @throws {UnauthorizedError} If the user enters incorrect form data, i.e. email/password pair do not match or the
   *   user does not have valid token.
   * @throws {ServerError} If the server fails unexpectedly.
   * @throws {UnexpectedError} For any non-Axios or unrecognized error.
   */
  findOptionListByCountryUuid: (countryUuid: string) => Promise<Array<UniversityOptionResponse>>;
}

/**
 * Manages university-related REST API operations, implementing {@link UniversityService}.
 */
export const universityService: UniversityService = {
  findOptionListByCountryUuid: (countryUuid: string): Promise<Array<UniversityOptionResponse>> => {
    return apiClient.serviceWrapper(() =>
      axiosConfigWithAuth.request<Array<UniversityOptionResponse>>({
        method: 'GET',
        url: `/api/v1/universities/options/${countryUuid}`,
      }),
    );
  },
};
