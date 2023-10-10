export interface IWarrantyValidCollaction {
  data: IWarrantyValid[];
  links: Links;
  meta: Meta;
}

export interface IWarrantyValid {
  id: string;
  kode: string;
  name: string;
  longWarranty: number;
  description: string;
  companyId: number;
  created_at: string;
  updated_at: string;
  deleted_at: any;
}

export interface Links {
  first: string;
  last: string;
  prev: any;
  next: string;
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

export interface IFormWarrantyValid {
  id?: string;
  kode?: string;
  name?: string;
  longWarranty?: number;
  description?: string;
  companyId?: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: any;
}

export interface IWarrantyErrorBody {
  message: string;
  errors: IDetailError;
}

interface IDetailError {
    id?: string[];
    kode?: string[];
    name?:string[];
    longWarranty?: string[];
    description?: string[];
    companyId?: string[];
    created_at?: string[];
    updated_at?: string[];
    deleted_at?: string[];
}
