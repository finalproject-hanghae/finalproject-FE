import axios from "axios";
import { drug } from "../types/drugs";
import { username } from "../types/users";
import { startAndEndDate } from "../types/weeks";

import applyInterceptorsTo from "./axiosInterceptors";

const baseApi = axios.create({
  baseURL: process.env.REACT_APP_DB_HOST + "schedule",
});

const useThisApi = applyInterceptorsTo(baseApi);

//drug 관련 API -> drugApi
const apiDrugAdd = async (data: drug) => {
  const dataApiDrugAdd = await useThisApi.post("", data);
  return dataApiDrugAdd;
};

const apiDrugList = async (path: username) => {
  const dataApiDrugList = await useThisApi.get(`/${path}`);
  return dataApiDrugList;
};

const apiDrugCheck = async (data: drug) => {
  const dataApiDrugCheck = await useThisApi.patch("/week", data);
  return dataApiDrugCheck;
};

const apiDrugWeek = async (path: username, params: startAndEndDate) => {
  const dataApiDrugWeek = await useThisApi.get(`/${path}/week`, {
    params: params,
  });
  return dataApiDrugWeek;
};

export const drugApi = {
  apiDrugAdd: (data: drug) => apiDrugAdd(data),
  apiDrugList: (path: username) => apiDrugList(path),
  apiDrugCheck: (data: drug) => apiDrugCheck(data),
  apiDrugWeek: (path: username, params: startAndEndDate) =>
    apiDrugWeek(path, params),
};
