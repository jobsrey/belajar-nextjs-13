export interface IAssetCollaction {
  data: IAsset[];
  links: Links;
  meta: Meta;
}

export interface IAsset {
  id?: string;
  genCosId?: string;
  genSysId?: string;
  barcode?: string;
  name?: string;
  description?: string;
  imageName?: string;
  currencyId?: string;
  estimatedValue?: string;
  qty?: number;
  purchasedDate?: string;
  depreciationDate?: string;
  adv?: string;
  nilaiJual?: string;
  residualValue?: string;
  purchaseFrom?: string;
  warrantyValidId?: string;
  nomorPo?: string;
  serialNumber?: string;
  statusNote?: string;
  isScanned?: number;
  userId?: string;
  statusId?: string;
  picId?: string;
  costCenterId?: number;
  categoryId?: number;
  locationId?: number;
  companyId?: string;
  classId?: string;
  uomId?: string;
  assetDumpId?: string;
  isApproved?: number;
  isNewComplete?: number;
  isActive?: number;
  customField?: string;
  isDisposal?: number;
  tanggalDisposal?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: any;
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

export interface IAssetErrorBody {
  message: string;
  errors: IDetailError;
}

interface IDetailError {
  id?: string[];
  genCosId?: string[];
  genSysId?: string[];
  barcode?: string[];
  name?: string[];
  description?: string[];
  imageName?: string[];
  currencyId?: string[];
  estimatedValue?: string[];
  qty?: string[];
  purchasedDate?: string[];
  depreciationDate?: string[];
  adv?: string[];
  nilaiJual?: string[];
  residualValue?: string[];
  purchaseFrom?: string[];
  warrantyValidId?: string[];
  nomorPo?: string[];
  serialNumber?: string[];
  statusNote?: string[];
  isScanned?: string[];
  userId?: string[];
  statusId?: string[];
  picId?: string[];
  costCenterId?: string[];
  categoryId?: string[];
  locationId?: string[];
  companyId?: string[];
  classId?: string[];
  uomId?: string[];
  assetDumpId?: string[];
  isApproved?: string[];
  isNewComplete?: string[];
  isActive?: string[];
  customField?: string[];
  isDisposal?: string[];
  tanggalDisposal?: string[];
  created_at?: string[];
  updated_at?: string[];
  deleted_at?: string[];
}
