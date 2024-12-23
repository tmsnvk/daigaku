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
import { InstitutionOption } from '@common-types';

/**
 * Defines the operations of the {@link institutionService} object, responsible for managing institution-related API requests.
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
    const response: AxiosResponse<Array<InstitutionOption>> = await axiosConfigWithAuth.request<Array<InstitutionOption>>({
      method: 'GET',
      url: '/api/v1/institutions/options',
    });

    return response.data;
  },
};
