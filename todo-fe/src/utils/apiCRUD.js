import api from './api';

export const getAsyncApi = async (path) => {
  try {
    const res = await api.get(`${path}`);
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const postAsyncApi = async (path, object) => {
  try {
    const res = await api.post(`${path}`, object);
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const putAsyncApi = async (path, object) => {
  try {
    const res = await api.put(`${path}`, object);
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const deleteAsyncApi = async (path, object) => {
  try {
    const res = await api.delete(`${path}`, object);
    return res;
  } catch (e) {
    console.log(e);
  }
};
