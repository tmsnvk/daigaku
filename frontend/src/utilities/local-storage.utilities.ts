/**
 * @prettier
 */

export const getLocalStorageObjectById = (id: string) => {
  return JSON.parse(localStorage.getItem(id) || '{}');
};

export const setLocalStorageObjectById = (id: string, data: { [key: string]: string }): void => {
  localStorage.setItem(id, JSON.stringify(data));
};
