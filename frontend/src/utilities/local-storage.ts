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
   * @return {TData} The object retrieved from storage or the default value.
   */
  getObjectById<TData>(id: string, defaultValue: TData): TData {
    const item = localStorage.getItem(id);

    return item ? (JSON.parse(item) as TData) : defaultValue;
  },

  /**
   * Stores an object in localStorage by its item id.
   *
   * @param id The key to store the item under in localStorage.
   * @param {TData} data The object to store, which will be converted to a JSON string before being saved.
   */
  setObjectById<TData>(id: string, data: TData): void {
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
