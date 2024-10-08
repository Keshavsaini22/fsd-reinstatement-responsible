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

type ReinstatementResponsibleFilterQuery = {
  headquarters: string[];
  is_active: string;
  search: string;
  limit?: number;
  page?: number;
};