import http from '../serverAPI';

export const getPostById = async (id) => {
  return http.get(`/posts/${id}`);
};

export const uploadPost = async (params) => {
  const { data } = await http.post('/posts', params);
  return data;
};

export const savePostChanges = async (params, id) => {
  const { data } = await http.patch(`/posts/${id}`, params);
  return data;
};
