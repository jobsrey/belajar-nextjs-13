import { RowModel } from "@tanstack/react-table";
import { Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useSession } from "next-auth/react";
import { IFormWarrantyValid } from "@/types/MasterWarrantyValid";
import { useMutationDataMasterWarrantyValid } from "@/query/MasterWarrantyValidQuery";

const { confirm } = Modal;

interface IProps {
  rowsData: RowModel<IFormWarrantyValid>;
}

export const BtnBulkDelete = ({ rowsData }: IProps) => {
  const session = useSession();
  const { handleBulkDelete } = useMutationDataMasterWarrantyValid({
    token: session.data?.user.token,
  });

  const showConfirm = () => {
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
    let listData: string[] = [];
    rowsData.rows.map((v, i) => listData.push(v.original.id as string));
    await handleBulkDelete({ listId: listData });
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-sm btn-error"
        onClick={showConfirm}
      >
        Hapus Semua {rowsData.rows.length}
      </button>
    </>
  );
};

interface IPropsContainerBtnBulk {
  children: React.ReactNode;
}
export const ContainerBtnBulk = ({ children }: IPropsContainerBtnBulk) => {
  return <div className="flex items-center py-2">{children}</div>;
};
