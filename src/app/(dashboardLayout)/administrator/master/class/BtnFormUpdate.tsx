import { useMutationDataMasterClass } from "@/query/MasterClassQuery";
import { IFormMasterClassType } from "@/types/MasterAsset";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Input, Modal, Spin } from "antd";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormItem } from "react-hook-form-antd";
import { BsPencilSquare } from "react-icons/bs";
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

interface IFormDefault {
  data: IFormMasterClassType;
}

interface IPropsFormUpdate {
  initValue: IFormMasterClassType;
  onCancel: () => void;
  onSubmit: () => void;
}

const FormUpdate = ({ initValue, onCancel, onSubmit }: IPropsFormUpdate) => {
  const session = useSession();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { handleUpdate } = useMutationDataMasterClass({
    token: session.data?.user.token,
  });

  //react form hook
  const { handleSubmit, control } = useForm<TFormData>({
    defaultValues: {
      name: initValue.name,
      kode: initValue.kode,
      id: initValue.id,
      description: initValue.description,
    },
    resolver: yupResolver(schema),
  });

  //on submit form
  const eventSubmit: SubmitHandler<TFormData> = async (data) => {
    setIsLoading(true);
    await handleUpdate(data);
    setIsLoading(false);
    onSubmit();
  };

  return (
    <Spin spinning={isLoading}>
      <Form
        layout="vertical"
        onFinish={handleSubmit(eventSubmit)}
        style={{ maxWidth: 600 }}
      >
        <FormItem control={control} label="Name" name="name">
          <Input />
        </FormItem>

        <FormItem control={control} label="Kode" name="kode">
          <Input />
        </FormItem>

        <FormItem control={control} label="Deskripsi" name="description">
          <Input />
        </FormItem>
        <div className="flex items-center gap-4 justify-end">
          <button
            className={`btn btn-sm btn-error`}
            type="button"
            title="Pindah"
            name="move"
            onClick={onCancel}
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

const BtnFormUpdate = ({ data }: IFormDefault) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleSubmit = () => {
    setIsOpen(false);
  };

  return (
    <>
      <span className="cursor-pointer" onClick={handleOpen}>
        <BsPencilSquare />
      </span>
      <Modal
        title="Ubah data master kelas Aset"
        open={isOpen}
        footer={null}
        destroyOnClose
        onCancel={handleCancel}
      >
        <FormUpdate
          initValue={data}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      </Modal>
    </>
  );
};

export default BtnFormUpdate;
