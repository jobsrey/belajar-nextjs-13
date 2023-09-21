export interface Root {
  data: Daum[];
  links: Links;
  meta: Meta;
}

export interface Daum {
  id: string;
  kode: string;
  name: string;
  description: string;
  kat_status: number;
  companyId: number;
  created_at: string;
  updated_at: string;
  deleted_at: any;
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
