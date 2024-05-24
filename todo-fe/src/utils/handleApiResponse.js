import { getAsyncApi } from './apiCRUD';

export const handleGetApiResponse = async (status, path, setState) => {
  if (status === 200) {
    const res = await getAsyncApi(`${path}`);
    setState(res.data.data);
  }
};
