import Axios from "axios";

const baseURL = import.meta.env.DEV
  ? import.meta.env.VITE_TESTING_URL
  : import.meta.env.VITE_BASE_URL;

export const PublicAxios = Axios.create({
  baseURL
});