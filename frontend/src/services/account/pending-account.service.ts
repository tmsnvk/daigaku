/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* configuration, utilities, constants imports */
import { axiosConfig } from '@daigaku/configuration';

/* interface, type, enum imports */
import { PendingAccountRegistrationPayload } from '@daigaku/common-types';

/**
 * Defines pending account service-related operations, handling API requests and interactions for pending account
 * management.
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
  register: (formData: PendingAccountRegistrationPayload) => Promise<void>;
}

/**
 * Manages pending-account-related REST API operations, implementing {@link PendingAccountService}.
 */
export const pendingAccountService: PendingAccountService = {
  register: async (formData: PendingAccountRegistrationPayload): Promise<void> => {
    await axiosConfig.request<void>({
      method: 'POST',
      url: '/api/v1/pending-accounts/register',
      data: formData,
    });
  },
};
