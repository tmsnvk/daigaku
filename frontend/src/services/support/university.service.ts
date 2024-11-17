/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

/* external imports */
import { AxiosResponse } from 'axios';

/* configuration, utilities, constants imports */
import { axiosConfigWithAuth } from '@configuration';

/* interface, type, enum imports */
import { UniversityOption } from '@common-types';

/**
 * ===============
 * Service API Calls {@link universityService}
 * ===============
 */

/**
 * Defines the operations of the {@link universityService} object, responsible for managing university-related API requests.
 *
 * @since 0.0.1
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
 *
 * @since 0.0.1
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
