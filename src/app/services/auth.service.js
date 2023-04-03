import axios from "axios";
import localStorageService from "./localStorage.service";
import config from "../config.json";

const httpAuth = axios.create({
  baseURL: config.apiEndpoint + "auth/"
});

const authService = {
  loginYandex: async (code) => {
    const { data } = await httpAuth.post(`signInYandex`, code);
    return data;
  },
  refresh: async () => {
    const { data } = await httpAuth.post(`token`, {
      refresh_token: localStorageService.getRefreshToken()
    });
    return data;
  }
};

export default authService;
