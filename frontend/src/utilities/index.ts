/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

import { getCurrentYear } from './get-current-year';
import { isEmpty } from './is-empty.ts';
import { joinTw } from './join-tw';
import { getLocalStorageObjectById, removeLocalStorageObjectById, setLocalStorageObjectById } from './local-storage.ts';
import { removeRolePrefix } from './remove-role-prefix';
import { isAuthTokenExpired } from './token.ts';

export {
  getCurrentYear,
  getLocalStorageObjectById,
  isAuthTokenExpired,
  isEmpty,
  joinTw,
  removeLocalStorageObjectById,
  removeRolePrefix,
  setLocalStorageObjectById,
};
