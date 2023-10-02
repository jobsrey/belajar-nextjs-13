import { BiMove } from "react-icons/bi";
import { ImArrowLeft2 } from "react-icons/im";
import { BsTrash } from "react-icons/bs";
import { NodeModel } from "@minoru/react-dnd-treeview";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { Session } from "next-auth";
import { AiOutlinePlus } from "react-icons/ai";
import { useMutationTree } from "@/query/CategoryQuery";

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

  const { handleMoveWithArrow, categoryNotificationContext } = useMutationTree({
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
      {categoryNotificationContext}
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

      <button
        className="btn btn-sm btn-circle"
        type="button"
        title="Hapus Kategori"
        onClick={handleDelete}
      >
        <BsTrash />
      </button>
    </div>
  );
};

export default TreeViewActionBtn;
