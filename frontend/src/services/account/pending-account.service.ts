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

/* configuration imports */
import { axiosConfig } from '@configuration';

/* interface, type, enum imports */
import { RegistrationFormFields } from '@pages/common/home/components/registration-form/registration-form.hooks';

/**
 * ===============
 * Service API Calls {@link pendingAccountService}
 * ===============
 */

/* interfaces, types, enums */
interface PendingAccountService {
  register: (formData: RegistrationFormFields) => Promise<void>;
}

/**
 * @description
 * The service manages pending-account-related REST API operations.
 *
 * @property {Function} register
 *
 * @since 0.0.1
 */
export const pendingAccountService: PendingAccountService = {
  /**
   * @description
   * The method sends a POST request with the provided registration credentials.
   * The server handles the registration process and responds accordingly.
   *
   * @param {RegistrationFormFields} formData - The registration form data object.
   *
   * @returns {Promise<void>} - A promise that resolves when the request is successfully sent.
   *
   * @throws {AxiosError} - Throws an error if the request fails.
   *
   * @since 0.0.1
   */
  register: async (formData: RegistrationFormFields): Promise<void> => {
    await axiosConfig.request({
      method: 'POST',
      url: '/api/v1/pending-accounts/register',
      data: formData,
    });
  },
};
