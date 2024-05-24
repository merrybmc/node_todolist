export const getLocalStorage = (key) => {
  const cachedData = localStorage.getItem(key);

  if (!cachedData) return null;

  return JSON.parse(cachedData);
};

export const setCachedData = (cachedData, setState) => {
  setState(cachedData);
};

export const validSetCacheData = (resData, cachedData, key, setState) => {
  if (JSON.stringify(resData) !== JSON.stringify(cachedData)) {
    localStorage.setItem(key, JSON.stringify(resData));
    setState(resData);
  }
};
