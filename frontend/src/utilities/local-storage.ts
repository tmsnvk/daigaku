/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

export const localStorageUtilities = {
  /**
   * Retrieves a parsed object from localStorage by its item id.
   *
   * @param id The key used to retrieve the item from localStorage.
   * @param defaultValue The default value to return if the item is not found or parsing fails.
   * @return {T} The object retrieved from storage or the default value.
   */
  getObjectById<T>(id: string, defaultValue: T): T {
    const item = localStorage.getItem(id);

    return item ? (JSON.parse(item) as T) : defaultValue;
  },

  /**
   * Stores an object in localStorage by its item id.
   *
   * @param id The key to store the item under in localStorage.
   * @param {T} data The object to store, which will be converted to a JSON string before being saved.
   */
  setObjectById<T>(id: string, data: T): void {
    localStorage.setItem(id, JSON.stringify(data));
  },

  /**
   * Removes an object in localStorage by its item id.
   *
   * @param id The key to store the item under in localStorage.
   */
  removeObjectById(id: string): void {
    localStorage.removeItem(id);
  },
};
