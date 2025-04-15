/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

import { getCurrentYear } from './get-current-year';
import { isEmpty } from './is-empty.utilities';
import { joinTw } from './join-tw';
import { getLocalStorageObjectById, removeLocalStorageObjectById, setLocalStorageObjectById } from './local-storage.utilities';
import { removeRolePrefix } from './remove-role-prefix';
import { isAuthTokenExpired } from './token.utilities';

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
