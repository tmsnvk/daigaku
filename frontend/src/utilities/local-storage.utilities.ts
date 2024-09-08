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

/**
 * @description
 * The function retrieves a parsed object from localStorage by its ID.
 *
 * @param {string} id - The key used to retrieve the item from localStorage.
 * @param {T} defaultValue - The default value to return if the item is not found.
 *
 * @returns {T} - The parsed object from localStorage, or the type's default value if the item is not present.
 *
 * @since 0.0.1
 */
export const getLocalStorageObjectById = <T>(id: string, defaultValue: T): T => {
  const item = localStorage.getItem(id);
  return item ? (JSON.parse(item) as T) : defaultValue;
};

/**
 * @description
 * The function stores an object in localStorage by its ID.
 *
 * @param {string} id - The key to store the item under in localStorage.
 * @param {T} data - The object to store, which will be serialized to JSON.
 *
 * @since 0.0.1
 */
export const setLocalStorageObjectById = <T>(id: string, data: T): void => {
  localStorage.setItem(id, JSON.stringify(data));
};
