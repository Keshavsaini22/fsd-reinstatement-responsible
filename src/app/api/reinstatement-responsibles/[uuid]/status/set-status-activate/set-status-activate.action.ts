import axios from "axios";

export const setStatusActive = (uuid: string) =>
  axios.patch(`${process.env.BACKEND_API_URL}/reinstatement-responsibles/${uuid}/activate`);
