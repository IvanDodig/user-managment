import { ApiService } from "../ApiService";
import { USER_ID_URL, USER_URL } from "./urls";

export const getUsersList = async () => {
  const requestParams = {
    url: USER_URL,
  };
  const response = await ApiService.GET(requestParams);
  return response;
};

export const getUserById = async ({ userId }) => {
  const requestParams = {
    url: USER_ID_URL(userId),
  };
  const response = await ApiService.GET(requestParams);
  return response;
};

export const deleteUserById = async ({ userId }) => {
  const requestParams = {
    url: USER_ID_URL(userId),
  };
  const response = await ApiService.DELETE(requestParams);
  return response;
};

export const postUser = async ({ data }) => {
  const requestParams = {
    url: USER_URL,
    data,
  };
  const response = await ApiService.POST(requestParams);
  return response;
};

export const putUser = async ({ data, userId }) => {
  const requestParams = {
    url: USER_ID_URL(userId),
    data,
  };
  const response = await ApiService.PUT(requestParams);
  return response;
};
