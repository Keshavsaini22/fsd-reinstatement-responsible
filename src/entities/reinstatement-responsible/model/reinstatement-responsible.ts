type ReinstatementResponsible = {
    headquarter: string;
    name: string;
    last_name: string;
    email: string;
    is_active: boolean;
    uuid: string;
    created_at: string;
    updated_at: string;
  };

  export type ResponsibleLoadingType = {
  create: boolean;
  fetch: boolean;
  switch: string[];
  delete: string[];
};

export type InitialState = {
  total: number;
  responsibles: ReinstatementResponsible[];
  loading: ResponsibleLoadingType;
  current_page: number;
  per_page: number;
};