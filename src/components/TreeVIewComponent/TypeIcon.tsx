import React from "react";
import FolderIcon from "@mui/icons-material/Folder";
import ImageIcon from "@mui/icons-material/Image";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DescriptionIcon from "@mui/icons-material/Description";

type Props = {
  hasChild: boolean;
  fileType?: string;
};

export const TypeIcon: React.FC<Props> = (props) => {

  if(props.hasChild){
    return <FolderIcon />;
  } else {
    return <DescriptionIcon />
  }

  switch (props.fileType) {
    case "image":
      return <ImageIcon />;
    case "csv":
      return <ListAltIcon />;
    case "text":
      return <DescriptionIcon />;
    default:
      return null;
  }
};
