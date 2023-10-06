import { CustomData } from "@/components/TreeVIewComponent/types";
import { NodeModel } from "@minoru/react-dnd-treeview";

export interface ICustomModelNode extends NodeModel<ILocation> {
  description?: string;
}

export interface ILocationCollaction {
  data: ICustomModelNode[];
}

export interface ILocation {
  id: number;
  parent: number;
  text: string;
  description: string;
}

export interface IFormLocation {
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
