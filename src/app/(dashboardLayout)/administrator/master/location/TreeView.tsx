"use client";
import {
  Tree,
  MultiBackend,
  getBackendOptions,
  DndProvider,
  DropOptions,
} from "@minoru/react-dnd-treeview";
import { CustomNode } from "@/components/TreeVIewComponent/CustomNode";
import { CustomDragPreview } from "@/components/TreeVIewComponent/CustomDragPreview";
import styles from "./TreeView.module.css";
import { DragSourceMonitor } from "react-dnd";
import { Session } from "next-auth";
import TreeViewActionBtn from "./TreeViewActionBtn";
import useTreeHookContext, {
  ITypeContext,
} from "./customHook/useTreeHookContext";
import { useMutationTree } from "@/query/MasterLocationQuery";
import { ICustomModelNode, ILocationCollaction } from "@/types/MasterLocation";

interface IProps {
  session: Session;
  collaction: ILocationCollaction;
}

const TreeView = ({ session, collaction }: IProps) => {
  const { handleMove } = useMutationTree({ token: session.user.token });
  const [store, setStore] = useTreeHookContext();

  const handleDrop = (newTree: ICustomModelNode[], options: DropOptions) => {
    handleMove({
      dragSourceId: options.dragSource?.id as number,
      dropTargetId: options.dropTarget?.id as number,
    });
  };
  const handleSelect = (node: ICustomModelNode) => {
    setStore((prev: ITypeContext) => {
      if (prev.selectNode?.id === node.id) {
        return { selectCategory: null, selectNode: null };
      }

      return {
        selectCategory: {
          id: node.id as number,
          description: node.description as string,
        },
        selectNode: { ...node },
      };
    });
  };

  const handleDragEnd = (
    node: ICustomModelNode,
    monitor: DragSourceMonitor
  ) => {
    // console.log(node);
    // console.log(monitor);
  };

  const handleBtnMove = () => {};

  const handleAddNew = () => {
    setStore((prev) => {
      return { selectCategory: null, selectNode: null };
    });
  };

  const handleDelete = () => {};

  return (
    <>
      <div className="max-h-[430px] overflow-y-auto">
        <DndProvider backend={MultiBackend} options={getBackendOptions()}>
          {collaction && (
            <Tree
              tree={collaction.data}
              sort={false}
              rootId={0}
              render={(node, options) => (
                <CustomNode
                  node={node}
                  {...options}
                  isSelected={node.id === store.selectNode?.id}
                  onSelect={handleSelect}
                />
              )}
              dragPreviewRender={(monitorProps) => (
                <CustomDragPreview monitorProps={monitorProps} />
              )}
              onDragEnd={handleDragEnd}
              onDrop={handleDrop}
              classes={{
                root: styles.treeRoot,
                draggingSource: styles.draggingSource,
                dropTarget: styles.dropTarget,
              }}
            />
          )}
        </DndProvider>
      </div>
      {store.selectNode && (
        <TreeViewActionBtn
          nodeSelect={store.selectNode}
          nodeTarget={store.selectNode}
          onMove={handleBtnMove}
          session={session}
          onAdd={handleAddNew}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};

export default TreeView;
