/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* configuration, utilities, constants imports */
import { axiosConfig } from '@configuration';

/* interface, type, enum imports */
import { PendingAccountRegisterRequest } from '@common-types';

/**
 * Defines the operations of the {@link pendingAccountService} object, responsible for managing pending-account-related API requests.
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
  register: (formData: PendingAccountRegisterRequest) => Promise<void>;
}

/**
 * Manages pending-account-related REST API operations, implementing {@link PendingAccountService}.
 */
export const pendingAccountService: PendingAccountService = {
  register: async (formData: PendingAccountRegisterRequest): Promise<void> => {
    await axiosConfig.request<void>({
      method: 'POST',
      url: '/api/v1/pending-accounts/register',
      data: formData,
    });
  },
};
