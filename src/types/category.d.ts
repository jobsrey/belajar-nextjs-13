import { CustomData } from "@/components/TreeVIewComponent/types";
import { NodeModel } from "@minoru/react-dnd-treeview";


export interface ICustomModelNode extends  NodeModel<Category> {
  description?: string;
}

export interface CategoryCollaction {
  data: ICustomModelNode[];
}

export interface Category {
  id: number;
  parent: number;
  text: string;
  description: string;
}

export interface IFormCategory {
  id?: number;
  parent?: number | null;
  parentId?: number | null;
  text?: string;
  description?: string;
  name?:string;
}

//override type
// export type ICustomModelNode = Omit<NodeModel<Category>[],'description'> & {
//   description?: string;
// };


export interface DataTreeInput {
  value: number
  title: string
  children: DataTreeInput[]
}
