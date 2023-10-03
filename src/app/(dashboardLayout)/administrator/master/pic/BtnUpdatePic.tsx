import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useMutationDataPic } from "@/query/PicQuery";
import { FormItem } from "react-hook-form-antd";
import { Form, Input, Spin, Modal } from "antd";
import { IFormPic } from "@/types/pic";
import { BsPencilSquare } from "react-icons/bs";

const schema = yup
  .object({
    id: yup.string(),
    kode: yup.string().required(),
    name: yup.string().required(),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

interface IPropsForm {
  onCancel: () => void;
  onSubmit: () => void;
  initValue: IFormPic;
}

const FormUpdateData = ({ onCancel, onSubmit, initValue }: IPropsForm) => {
  const session = useSession();

  //react query
  const { handleUpdate } = useMutationDataPic({
    token: session?.data?.user.token,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //react form hook
  const { handleSubmit, control } = useForm<FormData>({
    defaultValues: {
      name: initValue.name,
      kode: initValue.kode,
      id: initValue.id,
    },
    resolver: yupResolver(schema),
  });

  //on submit form
  const eventSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    await handleUpdate(data);
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
        <FormItem control={control} label="Name" name="name">
          <Input />
        </FormItem>

        <FormItem control={control} label="Kode" name="kode">
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

interface IBtnUPic {
  data: IFormPic;
}

const BtnUpdatePic = ({ data }: IBtnUPic) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOnSubmit = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <span className="cursor-pointer" onClick={handleOpenModal}>
        <BsPencilSquare />
      </span>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        footer={null}
        destroyOnClose
        onCancel={handleCloseModal}
      >
        <FormUpdateData
          initValue={data}
          onCancel={handleCloseModal}
          onSubmit={handleOnSubmit}
        />
      </Modal>
    </>
  );
};

export default BtnUpdatePic;
