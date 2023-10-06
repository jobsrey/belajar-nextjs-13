import { ImArrowLeft2 } from "react-icons/im";
import { NodeModel } from "@minoru/react-dnd-treeview";
import { useState } from "react";
import { Session } from "next-auth";
import { AiOutlinePlus } from "react-icons/ai";
import BtnDeleteNode from "./BtnDeleteNode";
import { useMutationTree } from "@/query/MasterCostCenterQuery";

interface IProps {
  nodeSelect: NodeModel | null;
  nodeTarget: NodeModel | undefined | null;
  onMove: () => void;
  session: Session;
  onAdd: () => void;
  onDelete: () => void;
}

const TreeViewActionBtn = ({ session, onAdd, nodeSelect }: IProps) => {
  const [selectBtn, setSelectBtn] = useState<string | null>();

  const { handleMoveWithArrow } = useMutationTree({
    token: session.user.token,
  });

  const handleActiveBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    let nameAttr = e.currentTarget.name;
    setSelectBtn((prev) => {
      if (prev === nameAttr) {
        return "";
      }

      return nameAttr;
    });
  };

  const handleClearActive = () => {
    setSelectBtn("");
  };

  const handleDelete = () => {};

  const handleMoveAction = async () => {
    await handleMoveWithArrow({
      dragSourceId: nodeSelect?.id as number,
      dropTargetId: nodeSelect?.parent as number,
    });
  };

  const handleAdd = () => {
    onAdd();
  };

  return (
    <div className="flex justify-center items-center p-2 gap-2">
      <button
        className="btn btn-sm btn-circle"
        title="Tambah Kategori Baru"
        onClick={handleAdd}
      >
        <AiOutlinePlus />
      </button>
      {nodeSelect?.parent !== 0 && (
        <button
          className="btn btn-sm btn-circle"
          title="Pindahkan Kategori Ke depan"
          onClick={handleMoveAction}
        >
          <ImArrowLeft2 />
        </button>
      )}

      <BtnDeleteNode/>
      
    </div>
  );
};

export default TreeViewActionBtn;
