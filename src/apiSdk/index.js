import { axiosInstance } from "http-client/axiosInstance";
import HttpClient from "utils/httpClient";

const apiInstance = new HttpClient(axiosInstance);

export const getAircrafts = (params = []) =>
  apiInstance.get("/aircrafts", params);

export const getFlights = (params = []) => apiInstance.get("/flights", params);
