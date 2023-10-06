import React from "react";
import useTreeHookContext from "./customHook/useTreeHookContext";
import { BsTrash } from "react-icons/bs";
import { Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useSession } from "next-auth/react";
import { useMutationTree } from "@/query/CategoryQuery";

const { confirm } = Modal;

const BtnDeleteNode = () => {
  const [store, setStore] = useTreeHookContext();

  const session = useSession();
  const { handleDeleteData } = useMutationTree({
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
    await handleDeleteData({ id: store.selectNode?.id as number });
  };

  return (
    <>
      <button
        className="btn btn-sm btn-circle"
        type="button"
        title="Hapus Kategori"
        onClick={confirmation}
      >
        <BsTrash />
      </button>
    </>
  );
};

export default BtnDeleteNode;
