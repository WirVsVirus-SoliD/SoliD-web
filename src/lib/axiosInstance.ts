import axios from "axios";
import storage from "./storage";

let instance = axios.create({
  headers: {
    common: {
      // can be common or any other method
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  },
  withCredentials: true
});

instance.interceptors.request.use(function (config) {
  if (storage.getToken())
    config.headers.common = {
      ...config.headers.common,
      Authorization: "bearer " + storage.getToken()
    };
  return config;
});

export default instance;
