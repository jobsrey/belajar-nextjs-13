"use client";
import { TextField } from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useMutationDataPic } from "@/query/PicQuery";
import { IFormPic } from "@/types/pic";

const schema = yup
  .object({
    id: yup.string(),
    kode: yup.string().required(),
    name: yup.string().required(),

  })
  .required();

type FormData = yup.InferType<typeof schema>;

interface IPropsForm {
  data?: IFormPic;
  handleClose: any;
  isNewRecord: boolean;
  isDone: any;
}

export const FormData = ({
  data,
  handleClose,
  isNewRecord,
  isDone,
}: IPropsForm) => {
  const session = useSession();

  //react query
  const { handleUpdate, handleCreate } = useMutationDataPic({
    token: session?.data?.user.token,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //react form hook
  const { handleSubmit, control } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      id: data?.id,
      kode: data?.kode,
      name: data?.name
    },
  });

  //on submit form
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    if (isNewRecord) {
      await handleCreate(data);
    } else {
      await handleUpdate(data);
    }
    setIsLoading(false);
    isDone();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogContent className="flex flex-col gap-4">
        <Controller
          name="kode"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              helperText={error ? error.message : null}
              margin="dense"
              size="small"
              error={!!error}
              label="Kode"
              type="text"
              fullWidth
              variant="outlined"
            />
          )}
        />
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              helperText={error ? error.message : null}
              margin="dense"
              error={!!error}
              size="small"
              label="Name"
              type="text"
              fullWidth
              variant="outlined"
            />
          )}
        />
      </DialogContent>

      <DialogActions className="mr-4">
        <button type="button" className="btn btn-neutral" onClick={handleClose}>
          BATAL
        </button>
        {!isLoading && (
          <button className="btn btn-primary" type="submit">
            SIMPAN
          </button>
        )}
        {isLoading && (
          <button className="btn" type="button">
            <span className="loading loading-spinner"></span>
            loading ...
          </button>
        )}
      </DialogActions>
    </form>
  );
};

interface IPropsFormModal {
  isOpen: boolean;
  onClose: any;
  data?: IFormPic;
  isNewRecord: boolean;
}

export const FormModal = ({
  isOpen,
  onClose,
  data,
  isNewRecord,
}: IPropsFormModal) => {
  return (
    <>
      <Dialog open={isOpen} onClose={onClose} fullWidth>
        <DialogTitle>Form PIC</DialogTitle>
        <FormData
          data={data}
          handleClose={onClose}
          isNewRecord={isNewRecord}
          isDone={onClose}
        />
      </Dialog>
    </>
  );
};
