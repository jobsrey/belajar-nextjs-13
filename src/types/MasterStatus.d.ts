export interface IStatusCollaction {
  data: IStatus[];
  links: Links;
  meta: Meta;
}

export interface IStatus {
  id: string;
  kode: string;
  name: string;
  description: string;
  kat_status?: number | undefined;
  companyId?: number | undefined;
  created_at?: string | undefined;
  updated_at?: string | undefined;
  deleted_at?: any | undefined;
}

export interface Links {
  first: string;
  last: string;
  prev: any;
  next: any;
}

export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: Link[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface Link {
  url?: string;
  label: string;
  active: boolean;
}

export interface IFormStatus{
  id?: string;
  kode?: string;
  name?: string;
  description?: string;
  kat_status?: number | undefined;
  companyId?: number | undefined;
  created_at?: string | undefined;
  updated_at?: string | undefined;
  deleted_at?: any | undefined;
}