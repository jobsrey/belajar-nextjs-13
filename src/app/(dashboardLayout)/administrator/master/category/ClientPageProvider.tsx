"use client";

import { Session } from "next-auth";
import TreeView from "./TreeView";
import { useQueryDataCategory } from "@/query/CategoryQuery";
import CircularIndeterminate from "@/components/Spinner/CircularIndeterminate";
import FormCategory from "./formCategory";
import {
  TreeContext,
  useTypeContextTree,
} from "./customHook/useTreeHookContext";

interface IProps {
  session: Session;
}

const ClientPageProvider = ({ session }: IProps) => {
  const { data: collaction, isLoading } = useQueryDataCategory({
    token: session.user.token,
  });

  const tree = useTypeContextTree();

  return (
    <>
      <TreeContext.Provider value={tree}>
        <div className="flex justify-center items-center p-8">
          <span className="text-lg font-bold">Master Kategori</span>
        </div>
        <div className="flex h-fit flex-row gap-2">
          <div
            className={`w-[50%] border ${
              isLoading && "h-96 flex justify-center items-center"
            }`}
          >
            {/* tree */}
            {isLoading && <CircularIndeterminate />}
            {collaction && (
              <TreeView collaction={collaction} session={session} />
            )}
          </div>
          <div className="w-full pr-8 border p-2 min-h-[300px]">
            <FormCategory />
          </div>
        </div>
      </TreeContext.Provider>
    </>
  );
};

export default ClientPageProvider;
