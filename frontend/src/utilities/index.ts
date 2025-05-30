/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

import { apiClientWrapper } from './apiClientWrapper.ts';
import { generateId } from './generate-id.ts';
import { getCurrentYear } from './get-current-year';
import { isEmpty } from './is-empty.ts';
import { joinTw } from './join-tw';
import { getLocalStorageObjectById, removeLocalStorageObjectById, setLocalStorageObjectById } from './local-storage.ts';
import { removeRolePrefix } from './remove-role-prefix';
import { isAuthTokenExpired } from './token.ts';

export {
  apiClientWrapper,
  generateId,
  getCurrentYear,
  getLocalStorageObjectById,
  isAuthTokenExpired,
  isEmpty,
  joinTw,
  removeLocalStorageObjectById,
  removeRolePrefix,
  setLocalStorageObjectById,
};
