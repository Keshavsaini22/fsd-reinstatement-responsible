import axios from "axios";

export const newReinstatementResponsibles = (body: any) =>
  axios.post(`${process.env.BACKEND_API_URL}/reinstatement-responsibles`, body);
