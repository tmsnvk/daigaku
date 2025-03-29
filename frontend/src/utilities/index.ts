/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

import { isEmpty } from './is-empty.utilities';
import { joinTw } from './join-tw';
import { getLocalStorageObjectById, removeLocalStorageObjectById, setLocalStorageObjectById } from './local-storage.utilities';
import { removeRolePrefix } from './remove-role-prefix';
import { isAuthTokenExpired } from './token.utilities';

export {
  getLocalStorageObjectById,
  isAuthTokenExpired,
  isEmpty,
  joinTw,
  removeLocalStorageObjectById,
  removeRolePrefix,
  setLocalStorageObjectById,
};
