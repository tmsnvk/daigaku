/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* configuration, utilities, constants imports */
import { axiosConfigWithAuth } from '@daigaku/configuration';
import { apiClientWrapper } from '@daigaku/utilities';

/* interface, type, enum, schema imports */
import { InstitutionOption } from '@daigaku/common-types';

/**
 * Defines institution-related operations, handling API requests and interactions for institution management.
 */
interface InstitutionService {
  /**
   * Retrieves all institution options.
   *
   * @return {Promise<Array<InstitutionOption>>}
   *
   * @throws {ServerError} If the server fails unexpectedly.
   * @throws {UnexpectedError} For any non-Axios or unrecognized error.
   */
  getAllOptions: () => Promise<Array<InstitutionOption>>;
}

/**
 * Manages institution-related REST API operations, implementing {@link InstitutionService}.
 */
export const institutionService: InstitutionService = {
  getAllOptions: (): Promise<Array<InstitutionOption>> => {
    return apiClientWrapper(() =>
      axiosConfigWithAuth.request<Array<InstitutionOption>>({
        method: 'GET',
        url: '/api/v1/institutions/options',
      }));
  },
};
