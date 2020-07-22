import axios from "axios";
import { ROOT_URL } from "../utils/constants";

export const getData = async () => {
  let data = null;
  try {
    const response = await axios.get(`${ROOT_URL}/data.min.json`);
    data = response.data;
  } catch (error) {
    console.log(error);
  }
  return data;
};

export const getTimeSeries = async () => {
  let data = null;
  try {
    const response = await axios.get(`${ROOT_URL}/timeseries.min.json`);
    data = response.data;
  } catch (error) {
    console.log(error);
  }
  return data;
};

export const getStateTimeSeries = async (id) => {
  let data = null;
  try {
    const response = await axios.get(`${ROOT_URL}/timeseries-${id}.min.json`);
    data = response.data;
  } catch (error) {
    console.log(error);
  }
  return data;
};
