/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* configuration, utilities, constants imports */
import { apiClientWrapper } from '@daigaku/utilities';
import { axiosConfigWithAuth } from '@daigaku/configuration';

/* interface, type, enum, schema imports */
import { UniversityOption } from '@daigaku/common-types';

/**
 * Defines university-related operations, handling API requests and interactions for university management.
 */
interface UniversityService {
  /**
   * Retrieves all university options for a specific country identified by its uuid.
   *
   * @return {Promise<Array<UniversityOption>>}
   *
   * @throws {ServerError} If the server fails unexpectedly.
   * @throws {UnexpectedError} For any non-Axios or unrecognized error.
   */
  getAllOptionsByCountryUuid: (selectedCountryUuid: string) => Promise<Array<UniversityOption>>;
}

/**
 * Manages university-related REST API operations, implementing {@link UniversityService}.
 */
export const universityService: UniversityService = {
  getAllOptionsByCountryUuid: (selectedCountryUuid: string): Promise<Array<UniversityOption>> => {
    return apiClientWrapper(() =>
      axiosConfigWithAuth.request<Array<UniversityOption>>({
        method: 'GET',
        url: `api/v1/universities/options/${selectedCountryUuid}`,
      }));
  },
};
