import { notification } from "antd";
import axios from "axios";

const ApiService = async ({ method, url, data, successMsg }) => {
  const config = {
    baseURL: process.env.API_URL,
  };

  const api = axios.create(config);

  return api
    .request({
      method,
      url,
      data,
    })
    .then(res => {
      if (successMsg && res?.statusText === "OK") {
        notification.info({
          message: `Success`,
          description: successMsg,
          placement: "top",
        });
      }
      return res.data;
    })
    .catch(err => {
      notification.error({
        message: `Error`,
        description: err.message || "Error happened!",
        placement: "top",
      });
    });
};

ApiService.GET = params => ApiService({ method: "get", ...params });

ApiService.POST = params =>
  ApiService({
    method: "post",
    successMsg: "Created successfully!",
    ...params,
  });

ApiService.PUT = params =>
  ApiService({ method: "put", successMsg: "Updated successfully", ...params });

ApiService.DELETE = params =>
  ApiService({
    method: "delete",
    successMsg: "Deleted successfully",
    ...params,
  });

export { ApiService };
