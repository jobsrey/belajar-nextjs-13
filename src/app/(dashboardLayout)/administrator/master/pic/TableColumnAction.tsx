import { Pic } from "@/types/pic";
import { Row } from "@tanstack/react-table";
import BtnUpdatePic from "./BtnUpdatePic";
import { BsTrash } from "react-icons/bs";
import { Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useMutationDataPic } from "@/query/PicQuery";
import { useSession } from "next-auth/react";

const { confirm } = Modal;

interface IProps {
  row: Row<Pic>;
}

interface IPropsBtnDelete {
  id: string;
}

const BtnDeletePic = ({ id }: IPropsBtnDelete) => {
  const session = useSession();
  const { handleDelete } = useMutationDataPic({
    token: session.data?.user.token,
  });

  const actionDelete = () => {
    confirm({
      title: "Apakah anda yakin?",
      icon: <ExclamationCircleFilled />,
      content: "Apakah anda yakin ingin menghapus data ini?",
      okButtonProps: { className: "btn btn-sm btn-primary " },
      onOk: () => {
        prosesDeleteData();
      },
    });
  };

  const prosesDeleteData = async () => {
    await handleDelete(id);
  };

  return (
    <span className="cursor-pointer" onClick={actionDelete}>
      <BsTrash />
    </span>
  );
};

const TableColumnAction = ({ row }: IProps) => {
  return (
    <div className="flex justify-center items-center gap-2">
      <BtnDeletePic id={row.original.id} />
      <BtnUpdatePic data={row.original} />
    </div>
  );
};

export default TableColumnAction;
