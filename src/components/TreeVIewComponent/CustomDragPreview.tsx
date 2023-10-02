'use client'
import type { DragLayerMonitorProps } from "@minoru/react-dnd-treeview";
import styles from "./CustomDragPreview.module.css";

type TProps = {
  monitorProps: DragLayerMonitorProps<any>;
};

export const CustomDragPreview = ({monitorProps}:TProps) => {
  const item = monitorProps.item;
  return (
    <div className={styles.root} data-testid="custom-drag-preview">
      {item.text}
    </div>
  );
};
