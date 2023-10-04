export interface IMasterUserAssetCollaction {
  data: IMasterUserAsset[];
  links: Links;
  meta: Meta;
}

export interface IMasterUserAsset {
  id: string
  kode: string
  name: string
  email: string
  description: string
  companyId: number
  created_at: string
  updated_at: string
  deleted_at: any
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


export interface IFormMasterUserAsset {
  id?: string
  kode?: string
  name?: string
  email?: string
  description?: string
  companyId?: number
  created_at?: string
  updated_at?: string
  deleted_at?: any
}
