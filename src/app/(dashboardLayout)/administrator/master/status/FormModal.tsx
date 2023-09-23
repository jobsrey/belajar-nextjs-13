"use client";

import { IFormStatus, Status } from "@/types/status.d";
import { TextField } from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useQueryDataStatus } from "@/query/StatusQuery";
import { useState } from "react";

const schema = yup
  .object({
    id: yup.string(),
    kode: yup.string().required(),
    name: yup.string().required(),
    description: yup.string().required(),
    kat_status: yup.number(),
    companyId: yup.number(),
    created_at: yup.string(),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

interface PropsFormStatus {
  dataStatus?: IFormStatus;
  handleClose: any;
  isNewRecord: boolean;
  isDone: any,
}

export const FormStatus = ({
  dataStatus,
  handleClose,
  isNewRecord,
  isDone
}: PropsFormStatus) => {
  //react query
  const { handleUpdate, handleCreate } = useQueryDataStatus();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //react form hook
  const { handleSubmit, control } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      id: dataStatus?.id,
      kode: dataStatus?.kode,
      name: dataStatus?.name,
      description: dataStatus?.description,
    },
  });

  //on submit form
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    if(isNewRecord){
      console.log('ini create');
      await handleCreate(data);
    } else {
      console.log('ini update');
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
        <Controller
          name="description"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              fullWidth
              label="Description"
              error={!!error}
              size="small"
              multiline
              rows={4}
              variant="outlined"
              helperText={error ? error.message : null}
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

interface PropsFormModal {
  isOpen: boolean;
  onClose: any;
  status?: IFormStatus;
  isNewRecord: boolean;
}

export const FormModal = ({
  isOpen,
  onClose,
  status,
  isNewRecord,
}: PropsFormModal) => {
  return (
    <>
      <Dialog open={isOpen} onClose={onClose} fullWidth>
        <DialogTitle>Form Update Status</DialogTitle>
        <FormStatus
          dataStatus={status}
          handleClose={onClose}
          isNewRecord={isNewRecord}
          isDone={onClose}
        />
      </Dialog>
    </>
  );
};
