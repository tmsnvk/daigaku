/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

import { apiClientWrapper } from './apiClientWrapper.ts';
import { generateSimpleId } from './generate-simple-id.ts';
import { getAccountRoleResource } from './get-account-role-resource.ts';
import { getCurrentYear } from './get-current-year';
import { getStatusDisplayValue } from './get-status-display-value.ts';
import { isEmpty } from './is-empty.ts';
import { joinTw } from './join-tw';
import { localStorageUtilities } from './local-storage.ts';
import { removeRolePrefix } from './remove-role-prefix';
import { isAuthTokenExpired } from './token.ts';

export {
  apiClientWrapper,
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
