export interface IMasterClassCollactionType {
  data: IMasterClassType[];
  links: Links;
  meta: Meta;
}

export interface IMasterClassType {
  id: string;
  kode: string;
  name: string;
  description: string;
  companyId: number;
  created_at: string;
  updated_at: string;
  deleted_at: any;
}

export interface ILinks {
  first: string;
  last: string;
  prev: any;
  next: string;
}

export interface IMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: Link[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface ILink {
  url?: string;
  label: string;
  active: boolean;
}

export interface IFormMasterClassType {
    id?: string;
    kode?: string;
    name?: string;
    description?: string;
    companyId?: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: any;
  }