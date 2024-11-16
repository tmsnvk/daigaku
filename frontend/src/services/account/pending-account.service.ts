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

/* configuration imports */
import { axiosConfig } from '@configuration';

/* interface, type, enum imports */
import { RegistrationFormFields } from '@pages/common/home/components/registration-form/registration-form.hooks';

/**
 * ===============
 * Service API Calls {@link pendingAccountService}
 * ===============
 */

/**
 * Defines the operations of the {@link pendingAccountService} object, responsible for managing pending-account-related API requests.
 *
 * @since 0.0.1
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
  register: (formData: RegistrationFormFields) => Promise<void>;
}

/**
 * Manages pending-account-related REST API operations, implementing {@link PendingAccountService}.
 *
 * @since 0.0.1
 */
export const pendingAccountService: PendingAccountService = {
  register: async (formData: RegistrationFormFields): Promise<void> => {
    await axiosConfig.request<void>({
      method: 'POST',
      url: '/api/v1/pending-accounts/register',
      data: formData,
    });
  },
};
