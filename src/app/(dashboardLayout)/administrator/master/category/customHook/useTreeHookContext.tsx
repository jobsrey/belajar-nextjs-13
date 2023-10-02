import { ICustomModelNode } from "@/types/category";
import { createContext, useContext, useState } from "react";

export interface ITypeContext {
  selectNode: ICustomModelNode | null;
}

export const useTypeContextTree = () => {
  const tree = useState<ITypeContext>({
    selectNode: null,
  });
  return tree;
};

type UseDataStoreReturnType = ReturnType<typeof useTypeContextTree>;

export const TreeContext = createContext<UseDataStoreReturnType | null>(null);

const useTreeHookContext = () => {
  const context = useContext(TreeContext);

  if (!context) {
    throw new Error(
      "useThemeContext must be used within a ThemeContextProvider"
    );
  }

  return context;
};

export default useTreeHookContext;
