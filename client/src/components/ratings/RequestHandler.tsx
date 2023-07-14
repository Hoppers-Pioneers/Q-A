// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import axios from "axios";

const requestHandler = (method, path = "", params = {}, data = {}) => {
  const request = {
    method: method,
    url: `http://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe${path}`,
    params: params,
    data: data,
    headers: {
      Authorization: import.meta.env.VITE_AUTH_TOKEN,
    },
  };
  return axios.request(request);
};

export default requestHandler;
