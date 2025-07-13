/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

import { apiClient } from './api-client.ts';
import { getCurrentYear } from './date-formatters.ts';
import { generateSimpleId } from './generate-simple-id.ts';
import { getAccountRoleResource } from './get-account-role-resource.ts';
import { getStatusDisplayValue } from './get-status-display-value.ts';
import { isEmpty } from './is-empty.ts';
import { joinTw } from './join-tw';
import { localStorageUtilities } from './local-storage.ts';
import { removeRolePrefix } from './remove-role-prefix';
import { isAuthTokenExpired } from './token.ts';

export {
  apiClient,
  generateSimpleId,
  getAccountRoleResource,
  getCurrentYear,
  getStatusDisplayValue,
  isAuthTokenExpired,
  isEmpty,
  joinTw,
  localStorageUtilities,
  removeRolePrefix,
};
