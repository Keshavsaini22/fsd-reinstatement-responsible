export const getReinstatementResponsibles = (search: any) =>
  fetch(`${process.env.BACKEND_API_URL}/reinstatement-responsibles${search}`, {
    cache: "no-cache",
  });
