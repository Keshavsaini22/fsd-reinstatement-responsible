import axios from "axios";

export const editReinstatementResponsibles = (uuid: string, body: any) =>
  axios.put(`${process.env.BACKEND_API_URL}/reinstatement-responsibles/${uuid}`, body);
