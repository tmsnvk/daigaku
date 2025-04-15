/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* configuration, utilities, constants imports */
import { axiosConfig } from '@configuration';

/* interface, type, enum imports */
import { PendingAccountRegistrationRequest } from '@common-types';

/**
 * Defines pending account service-related operations, handling API requests and interactions for pending account management.
 */
interface PendingAccountService {
  /**
   * Registers a new pending-account by sending a POST request with registration credentials.
   * The server handles the registration process and responds with a status indicating success or failure.
   *
   * @param formData The registration form data object.
   * @return {Promise<void>}
   * @throws {AxiosError}
   */
  register: (formData: PendingAccountRegistrationRequest) => Promise<void>;
}

/**
 * Manages pending-account-related REST API operations, implementing {@link PendingAccountService}.
 */
export const pendingAccountService: PendingAccountService = {
  register: async (formData: PendingAccountRegistrationRequest): Promise<void> => {
    await axiosConfig.request<void>({
      method: 'POST',
      url: '/api/v1/pending-accounts/register',
      data: formData,
    });
  },
};
