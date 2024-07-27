const getLocalStorageObjectById = (id: string) => {
  return JSON.parse(localStorage.getItem(id) || '{}');
};

const setLocalStorageObjectById = (id: string, data: { [key: string]: string }): void => {
  localStorage.setItem(id, JSON.stringify(data));
};

export {
  getLocalStorageObjectById,
  setLocalStorageObjectById,
};
