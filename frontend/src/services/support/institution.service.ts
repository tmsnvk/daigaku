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
import { InstitutionOptionResponse } from '@daigaku/common-types';

/**
 * Defines institution-related operations, handling API requests and interactions for institution management.
 */
interface InstitutionService {
  /**
   * Retrieves all institution options.
   *
   * @return {Promise<Array<InstitutionOptionResponse>>}
   *
   * @throws {ServerError} If the server fails unexpectedly.
   * @throws {UnexpectedError} For any non-Axios or unrecognized error.
   */
  getAllAsOption: () => Promise<Array<InstitutionOptionResponse>>;
}

/**
 * Manages institution-related REST API operations.
 */
export const institutionService: InstitutionService = {
  getAllAsOption: (): Promise<Array<InstitutionOptionResponse>> => {
    return apiClient.serviceWrapper(() =>
      axiosConfigWithAuth.request<Array<InstitutionOptionResponse>>({
        method: 'GET',
        url: '/api/v1/institutions/options',
      }),
    );
  },
};
