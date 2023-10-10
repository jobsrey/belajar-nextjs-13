import { useMutationDataAsset } from "@/query/AssetQuery";
import { IAsset, IAssetErrorBody } from "@/types/Asset";
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
    genCosId: yup.string().required(),
    genSysId: yup.string().required(),
    name: yup.string().required(),
    description: yup.string(),
  })
  .required();

type TFormData = yup.InferType<typeof schema>;

interface IFormDefault {
  data: IAsset;
}

interface IPropsFormUpdate {
  initValue: IAsset;
  onCancel: () => void;
  onSubmit: () => void;
}

const FormUpdate = ({ initValue, onCancel, onSubmit }: IPropsFormUpdate) => {
  const session = useSession();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { handleUpdate } = useMutationDataAsset({
    token: session.data?.user.token,
  });

  //react form hook
  const { handleSubmit, control,setError } = useForm<TFormData>({
    defaultValues: {
      genCosId: initValue.genCosId,
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

  const onErrorSubmitData = (error: AxiosError<IAssetErrorBody>) => {
    const itemsError = error.response?.data.errors;
    if (itemsError) {
      itemsError.genCosId?.map((v: string, i) => setError("genCosId", { message: v }));
      itemsError.genSysId?.map((v: string, i) => setError("genSysId", { message: v }));
      itemsError.name?.map((v: string, i) => setError("name", { message: v }));
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
        <FormItem control={control} label="System ID" name="genSysId">
          <Input />
        </FormItem>

        <FormItem control={control} label="Custom ID" name="genCosId">
          <Input />
        </FormItem>

        <FormItem control={control} label="Name" name="name">
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
