import http from './../serverAPI';

export const uploadImage = async (formData) => {
  const { data } = await http.post('/upload', formData);
  return data;
};
