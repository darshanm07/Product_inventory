// api/apiServices.js

import axios from "axios";
import Toast from "../utils/toast";
import { getToken } from "../utils/helper";

const makeRequest = async (method, url, data = {}) => {
  try {
    const token = getToken();
    const response = await axios({
      method,
      url,
      data,
      headers: token ? { Authorization: `jwt ${token}` } : {},
    });
    return response?.data || response;
  } catch (error) {
    Toast(error.response.data.message || "Something Went Wrong..!", "error");
  }
};

export const getRequest = (url, data) => {
  return makeRequest("get", url, data);
};

export const postRequest = (url, data) => {
  return makeRequest("post", url, data);
};

export const putRequest = (url, data) => {
  return makeRequest("put", url, data);
};

export const patchRequest = (url, data) => {
  return makeRequest("patch", url, data);
};

export const deleteRequest = (url, data) => {
  return makeRequest("delete", url, data);
};