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

/**
 * Retrieves a parsed object from localStorage by its item id.
 *
 * @param id The key used to retrieve the item from localStorage.
 * @param defaultValue The default value to return if the item is not found.
 * @return {T}
 *
 * @since 0.0.1
 */
export const getLocalStorageObjectById = <T>(id: string, defaultValue: T): T => {
  const item: string | null = localStorage.getItem(id);
  return item ? (JSON.parse(item) as T) : defaultValue;
};

/**
 * Stores an object in localStorage by its item id.
 *
 * @param id The key to store the item under in localStorage.
 * @param {T} data The object to store, which will be converted to a JSON string before being saved.
 *
 * @since 0.0.1
 */
export const setLocalStorageObjectById = <T>(id: string, data: T): void => {
  localStorage.setItem(id, JSON.stringify(data));
};
