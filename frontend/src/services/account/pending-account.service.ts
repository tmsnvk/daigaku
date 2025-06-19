/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* configuration, utilities, constants imports */
import { axiosConfig } from '@daigaku/configuration';
import { apiClientWrapper } from '@daigaku/utilities';

/* interface, type imports */
import { CreatePendingAccountPayload } from '@daigaku/common-types';

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
   *
   * @throws {FormValidationError} If the server returns field-level validation errors.
   * @throws {ServerError} If the server fails unexpectedly.
   * @throws {UnexpectedError} For any non-Axios or unrecognized error.
   */
  create: (formData: CreatePendingAccountPayload) => Promise<void>;
}

/**
 * Manages pending-account-related REST API operations, implementing {@link PendingAccountService}.
 */
export const pendingAccountService: PendingAccountService = {
  create: (formData: CreatePendingAccountPayload): Promise<void> => {
    return apiClientWrapper(() =>
      axiosConfig.request<void>({
        method: 'POST',
        url: '/api/v1/pending-accounts/create',
        data: formData,
      }),
    );
  },
};
