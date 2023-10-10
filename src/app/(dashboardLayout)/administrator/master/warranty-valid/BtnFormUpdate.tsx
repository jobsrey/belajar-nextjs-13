import { useMutationDataMasterWarrantyValid } from "@/query/MasterWarrantyValidQuery";
import { IFormWarrantyValid, IWarrantyErrorBody } from "@/types/MasterWarrantyValid";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Input, InputNumber, Modal, Spin } from "antd";
import { AxiosError } from "axios";
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
    longWarranty: yup.number().required(),
    description: yup.string(),
  })
  .required();

type TFormData = yup.InferType<typeof schema>;

interface IFormDefault {
  data: IFormWarrantyValid;
}

interface IPropsFormUpdate {
  initValue: IFormWarrantyValid;
  onCancel: () => void;
  onSubmit: () => void;
}

const FormUpdate = ({ initValue, onCancel, onSubmit }: IPropsFormUpdate) => {
  const session = useSession();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { handleUpdate } = useMutationDataMasterWarrantyValid({
    token: session.data?.user.token,
  });

  //react form hook
  const { handleSubmit, control,setError } = useForm<TFormData>({
    defaultValues: {
      kode: initValue.kode,
      name: initValue.name,
      id: initValue.id,
      description: initValue.description,
    },
    resolver: yupResolver(schema),
  });

  //on submit form
  const eventSubmit: SubmitHandler<TFormData> = async (data) => {
    setIsLoading(true);
    await handleUpdate(data,{
      onError: (error:any) => {
        onErrorSubmitData(error)
      }
    });
    setIsLoading(false);
    onSubmit();
  };

  const onErrorSubmitData = (error: AxiosError<IWarrantyErrorBody>) => {
    const itemsError = error.response?.data.errors;
    if (itemsError) {
      itemsError.kode?.map((v: string, i) => setError("kode", { message: v }));
      itemsError.name?.map((v: string, i) => setError("name", { message: v }));
      itemsError.longWarranty?.map((v: string, i) => setError("longWarranty", { message: v }));
      itemsError.description?.map((v: string, i) => setError("description", { message: v }));
    }
    setIsLoading(false);
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

        <FormItem control={control} label="Panjang Garansi" name="longWarranty">
          <InputNumber className="w-full"/>
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
        title="Ubah data master masa garansi"
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
