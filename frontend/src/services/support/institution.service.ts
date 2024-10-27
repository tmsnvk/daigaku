/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 */

/* external imports */
import { AxiosResponse } from 'axios';

/* configuration, utilities, constants imports */
import { axiosConfigWithAuth } from '@configuration';

/* interface, type, enum imports */
import { InstitutionOption } from '@common-types';

/**
 * ===============
 * Service API Calls {@link institutionService}
 * ===============
 */

/**
 * Defines the operations of the {@link institutionService} object, responsible for managing institution-related API requests.
 *
 * @since 0.0.1
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
 *
 * @since 0.0.1
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
