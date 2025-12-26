import type { HealthReport } from "../interface/interface";
import { PublicAxios } from "../utils/axiosConfig/axiosConfig";

export const postDailyLog = async (values:HealthReport ) => {
  const response = await PublicAxios.post("/daily-logs", values);
  return {
    data: response.data,
    status: response.status,
  };
};