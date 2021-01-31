import axios from "axios";
import { authReady } from "./firebase";
import * as CommonConstants from '../constants/commonConstants';


const createAxios = () => {
  const myAxios = axios.create({
      baseURL: CommonConstants.BASE_RTDB_URL
  });
  return myAxios;
};

export default () =>
  new Promise((resolve, reject) => {
    authReady()
      .then(() => resolve(createAxios()))
      .catch(reject);
  });