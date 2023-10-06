import { useMutationDataMasterStatus } from "@/query/MasterStatusQuery";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Input, Modal, Spin } from "antd";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { SubmitHandler, set, useForm } from "react-hook-form";
import { FormItem } from "react-hook-form-antd";
import { BsPlusLg } from "react-icons/bs";
import * as yup from "yup";

const schema = yup
  .object({
    id: yup.string(),
    kode: yup.string().required(),
    name: yup.string().required(),
    description: yup.string(),
  })
  .required();

type TFormData = yup.InferType<typeof schema>;

interface IPropsForm {
  onCancel: () => void;
  onSubmit: () => void;
}

const FormCreate = ({ onSubmit, onCancel }: IPropsForm) => {
  const session = useSession();

  //react query
  const { handleCreate } = useMutationDataMasterStatus({
    token: session?.data?.user.token,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //react form hook
  const { handleSubmit, control } = useForm<TFormData>({
    resolver: yupResolver(schema),
  });

  //on submit form
  const eventSubmit: SubmitHandler<TFormData> = async (data) => {
    setIsLoading(true);
    await handleCreate(data);
    setIsLoading(false);
    onSubmit();
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Spin spinning={isLoading}>
      <Form
        layout="vertical"
        onFinish={handleSubmit(eventSubmit)}
        style={{ maxWidth: 600 }}
      >
        <FormItem control={control} label="Kode" name="kode">
          <Input />
        </FormItem>

        <FormItem control={control} label="Name" name="name">
          <Input />
        </FormItem>

        <FormItem control={control} label="Description" name="description">
          <Input />
        </FormItem>

        <div className="flex items-center gap-4 justify-end">
          <button
            className={`btn btn-sm btn-error`}
            type="button"
            title="Pindah"
            name="move"
            onClick={handleCancel}
          >
            BATAL
          </button>
          {!isLoading && (
            <button className="btn btn-sm btn-primary" type="submit">
              SIMPAN
            </button>
          )}
          {isLoading && (
            <button className="btn btn-sm" type="button">
              <span className="loading loading-spinner"></span>
              loading ...
            </button>
          )}
        </div>
      </Form>
    </Spin>
  );
};

const BtnFormCreate = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleSubmitForm = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpenModal}
        className="btn btn-sm btn-primary"
      >
        <BsPlusLg /> Tambah Status
      </button>
      <Modal
        title="Tambah Data Status"
        open={isOpen}
        footer={null}
        destroyOnClose
        onCancel={handleCancel}
      >
        <FormCreate onCancel={handleCancel} onSubmit={handleSubmitForm} />
      </Modal>
    </>
  );
};

export default BtnFormCreate;
