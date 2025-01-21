/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

import { isEmpty } from './is-empty.utilities';
import { getLocalStorageObjectById, removeLocalStorageObjectById, setLocalStorageObjectById } from './local-storage.utilities';
import { isAuthTokenExpired } from './token.utilities';

export { getLocalStorageObjectById, isAuthTokenExpired, isEmpty, removeLocalStorageObjectById, setLocalStorageObjectById };
