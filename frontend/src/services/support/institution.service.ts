/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { AxiosResponse } from 'axios';

/* configuration, utilities, constants imports */
import { axiosConfigWithAuth } from '@daigaku/configuration';

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
   * @throws {AxiosError}
   */
  getAllOptions: () => Promise<Array<InstitutionOption>>;
}

/**
 * Manages institution-related REST API operations, implementing {@link InstitutionService}.
 */
export const institutionService: InstitutionService = {
  getAllOptions: async (): Promise<Array<InstitutionOption>> => {
    const response: AxiosResponse<Array<InstitutionOption>> = await axiosConfigWithAuth.request<
      Array<InstitutionOption>
    >({
      method: 'GET',
      url: '/api/v1/institutions/options',
    });

    return response.data;
  },
};
