import axiosInstance from './axios';

export const getData = endPoint => axiosInstance.get(endPoint);

export const postData = (endPoint, body, headers) =>
  axiosInstance.post(endPoint, body, {headers});

export const patchData = (endPoint, body, headers) =>
  axiosInstance.patch(endPoint, body, {headers});

export const deleteData = (endPoint, body, headers) =>
  axiosInstance.delete(endPoint, body, {headers});
