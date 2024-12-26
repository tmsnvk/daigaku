/**
 * @prettier
 */

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
import { UniversityOption } from '@common-types';

/**
 * Defines university-related operations, handling API requests and interactions for university management.
 */
interface UniversityService {
  /**
   * Retrieves all university options for a specific country identified by its uuid.
   *
   * @return {Promise<Array<UniversityOption>>}
   * @throws {AxiosError}
   */
  getAllOptionsByCountryUuid: (selectedCountryUuid: string) => Promise<Array<UniversityOption>>;
}

/**
 * Manages university-related REST API operations, implementing {@link UniversityService}.
 */
export const universityService: UniversityService = {
  getAllOptionsByCountryUuid: async (selectedCountryUuid: string): Promise<Array<UniversityOption>> => {
    const response: AxiosResponse<Array<UniversityOption>> = await axiosConfigWithAuth.request<Array<UniversityOption>>({
      method: 'GET',
      url: `api/v1/universities/options/${selectedCountryUuid}`,
    });

    return response.data;
  },
};
