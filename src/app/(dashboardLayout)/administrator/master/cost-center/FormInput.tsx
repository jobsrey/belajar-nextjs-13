import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useTreeHookContext from "./customHook/useTreeHookContext";
import { useEffect, useMemo, useState } from "react";
import { TreeSelect, Form, Input, Spin } from "antd";
import CircularIndeterminate from "@/components/Spinner/CircularIndeterminate";
import { useSession } from "next-auth/react";
import { FormItem } from "react-hook-form-antd";
import { useMutationTree, useQueryListDataTeeInput } from "@/query/MasterCostCenterQuery";

const schema = yup
  .object({
    id: yup.number(),
    parentId: yup.number(),
    name: yup.string().required(),
    description: yup.string().required("tidak boleh kosong"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const LoadingForm = () => {
  return (
    <div className="flex min-h-[300px] justify-center items-center">
      <CircularIndeterminate />
    </div>
  );
};

const FormCategory = () => {
  const [store, setStore] = useTreeHookContext();
  const session = useSession();
  const [isNewRecord, setIsNewRecord] = useState<boolean>(false);
  const [isLoadingForm, setIsLoadingForm] = useState<boolean>(false);

  const { data } = useQueryListDataTeeInput({
    token: session.data?.user.token,
  });

  const { handleCreateNew, handleUpdateData } = useMutationTree({
    token: session.data?.user.token,
  });

  const [showComponentOneSecond, setShowComponentOneSecond] =
    useState<boolean>(false);

  //react form hook
  const { handleSubmit, control, reset } = useForm<FormData>({
    resolver: yupResolver(schema),
    // defaultValues: {
    //   id: store.selectNode?.id as number,
    //   parentId: store.selectNode?.parent as number,
    //   name: store.selectNode?.text as string,
    // },
    defaultValues: useMemo(() => {
      return {
        id: store.selectNode?.id as number,
        parentId: store.selectNode?.parent
          ? (store.selectNode?.parent as number)
          : undefined,
        name: store.selectNode?.text as string,
        description: "hallo",
      };
    }, [store]),
  });

  useEffect(() => {
    reset({
      id: store.selectNode?.id as number,
      parentId: store.selectNode?.parent
        ? (store.selectNode?.parent as number)
        : undefined,
      name: store.selectNode?.text as string,
      description: store.selectNode?.description as string,
    });

    setShowComponentOneSecond(false);

    setInterval(() => {
      setShowComponentOneSecond(true);
    }, 1000);
  }, [reset, store]);

  useEffect(() => {
    if (store.selectNode?.id) {
      setIsNewRecord(false);
    } else {
      setIsNewRecord(true);
    }
  }, [store]);

  //on submit form
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);

    setIsLoadingForm(true);
    if (isNewRecord) {
      await handleCreateNew({
        name: data.name,
        description: data.description,
        parentId: data.parentId,
      });
    } else {
      await handleUpdateData(data);
    }
    setIsLoadingForm(false);
    // isDone();
  };

  if (!session.data?.user.token) {
    return <LoadingForm />;
  }

  const handleCancel = () => {
    if (store.selectNode?.id) {
      setStore((prev) => {
        return { selectNode: null };
      });
    }

    reset();
  };

  return (
    <>
      {!showComponentOneSecond && <LoadingForm />}
      {showComponentOneSecond && (
        <Spin spinning={isLoadingForm}>
          <Form
            layout="vertical"
            onFinish={handleSubmit(onSubmit)}
            style={{ maxWidth: 600 }}
          >
            <span className="text-lg font-semibold">
              Form {isNewRecord ? "Input" : "Update"} Lokasi
            </span>
            <FormItem control={control} label="Name" name="name">
              <Input />
            </FormItem>

            <FormItem control={control} label="Deskripsi" name="description">
              <Input />
            </FormItem>
            <FormItem control={control} label="Parent Root" name="parentId">
              <TreeSelect
                treeLine={true}
                style={{ width: "100%" }}
                treeData={data?.data}
                treeDefaultExpandAll
                showSearch
                allowClear
              />
            </FormItem>
            <div className="flex items-center gap-4 justify-center">
              <button
                className={`btn btn-sm btn-primary`}
                type="submit"
                title="Pindah"
                name="move"
              >
                SIMPAN {!isNewRecord && "PERUBAHAN"}
              </button>

              <button
                className={`btn btn-sm btn-error`}
                type="button"
                title="Pindah"
                name="move"
                onClick={handleCancel}
              >
                BATAL
              </button>
            </div>
          </Form>
        </Spin>
      )}
    </>
  );
};

export default FormCategory;

// <TextField
//   {...field}
//   helperText={error ? error.message : null}
//   margin="dense"
//   error={!!error}
//   size="small"
//   label="Deskripsi"
//   type="text"
//   fullWidth
//   variant="outlined"
// />
/**
 * 
 *  <Form.Item label="Deskripsi">
            <Controller
              render={({ field, fieldState: { error } }) => (
                <Input {...field} placeholder="Deskripsi" />
              )}
              name="description"
              control={control}
            />
          </Form.Item>
 */
