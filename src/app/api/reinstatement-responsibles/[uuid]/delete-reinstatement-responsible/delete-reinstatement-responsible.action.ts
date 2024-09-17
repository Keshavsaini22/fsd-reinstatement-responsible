import axios from "axios";

export const deleteReinstatementResponsibles = (uuid: string) =>
  axios.delete(`${process.env.BACKEND_API_URL}/reinstatement-responsibles/${uuid}`);
