import axios from "axios";

export const setStatusInActive = (uuid: string) =>
  axios.patch(`${process.env.BACKEND_API_URL}/reinstatement-responsibles/${uuid}/deactivate`);
