import { CustomData } from "@/components/TreeVIewComponent/types";
import { NodeModel } from "@minoru/react-dnd-treeview";

export interface ICustomModelNode extends NodeModel<ICostCenter> {
  description?: string;
}

export interface ICostCenterCollaction {
  data: ICustomModelNode[];
}

export interface ICostCenter {
  id: number;
  parent: number;
  text: string;
  description: string;
}

export interface IFormCostCenter {
  id?: number;
  parent?: number | null;
  parentId?: number | null;
  text?: string;
  description?: string;
  name?: string;
}

export interface IDataTreeInput {
  value: number;
  title: string;
  children: IDataTreeInput[];
}
