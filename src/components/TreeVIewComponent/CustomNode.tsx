"use client";
import React from "react";
import Typography from "@mui/material/Typography";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import type { NodeModel } from "@minoru/react-dnd-treeview";
import styles from "./CustomNode.module.css";
import { TypeIcon } from "./TypeIcon";

type Props = {
  node: NodeModel;
  depth: number;
  isOpen: boolean;
  isSelected: boolean;
  hasChild: boolean;
  testIdPrefix?: string;
  onToggle: (id: NodeModel["id"]) => void;
  onSelect: (value: any) => void;
};

export const CustomNode = ({ testIdPrefix = "", ...props }: Props) => {
  const { id, droppable, data } = props.node;
  const indent = props.depth * 16;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    props.onToggle(props.node.id);
  };

  const handleSelect = () => {
    props.onSelect(props.node);
  };

  return (
    <>
      {/* <div
        className={`${styles.root} ${
          props.isSelected ? styles.isSelected : ""
        }`}
        style={{ paddingInlineStart: indent }}
        data-testid={`${testIdPrefix}custom-node-${id}`}
      >
        <div
          className={` ${styles.expandIconWrapper}  ${props.isOpen ? styles.isOpen : ""}`}
        >
          {props.hasChild && (
            <div className={styles.arrow} onClick={handleToggle}>
              <ArrowRightIcon data-testid={`arrow-right-icon-${id}`} />
            </div>
          )}
        </div>
        <div>
          <TypeIcon droppable={true} />
        </div>
        <div className={styles.labelGridItem} onClick={handleSelect}>
          <Typography variant="body2">{props.node.text}</Typography>
        </div>
      </div> */}

      <div
        className={`tree-node ${styles.root} ${
          props.isSelected ? styles.isSelected : ""
        }`}
        style={{ paddingInlineStart: indent }}
        onClick={handleSelect}
      >
        <div
          className={`${styles.expandIconWrapper} ${
            props.isOpen ? styles.isOpen : ""
          }`}
        >
          {props.hasChild && (
            <div onClick={handleToggle}>
              <ArrowRightIcon />
            </div>
          )}
        </div>
        <div>
          <TypeIcon hasChild={props.hasChild} />
        </div>
        <div className={styles.labelGridItem}>
          <Typography variant="body2">{props.node.text}</Typography>
        </div>
      </div>
    </>
  );
};
