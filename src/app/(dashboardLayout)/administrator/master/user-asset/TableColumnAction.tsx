import { Row } from "@tanstack/react-table";
import React from "react";
import { BsTrash3 } from "react-icons/bs";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";
import { useSession } from "next-auth/react";
import BtnFormUpdate from "./BtnFormUpdate";
import { IMasterUserAsset } from "@/types/MasterUserAsset";
import { useMutationDataMasterUserAsset } from "@/query/MasterUserAsset";

const { confirm } = Modal;

interface IProps {
  row: Row<IMasterUserAsset>;
}

interface IPropsBtn {
  id: string;
}

const BtnDelete = ({ id }: IPropsBtn) => {
  const session = useSession();
  const { handleDelete } = useMutationDataMasterUserAsset({
    token: session.data?.user.token,
  });

  const confirmation = () => {
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
    <span className="cursor-pointer" onClick={confirmation}>
      <BsTrash3 />
    </span>
  );
};

const TableColumnAction = ({ row }: IProps) => {
  return (
    <div className="flex justify-center items-center gap-2">
      <BtnFormUpdate data={row.original} />
      <BtnDelete id={row.original.id} />
    </div>
  );
};

export default TableColumnAction;
