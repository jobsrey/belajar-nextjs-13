import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import { Button } from "@mui/material";

interface IConfirmationDialogRawProps {
  dataId: string;
  open: boolean;
  title: string;
  message: string;
  onClose: (value?: any) => void;
  onConfirmation: (value?: any) => void
}

const ConfirmationDialog = ({
  dataId,
  open,
  title,
  message,
  onClose,
  onConfirmation
}: IConfirmationDialogRawProps) => {


  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose();
    onConfirmation(dataId);
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        <h2>{message}</h2>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}


export default ConfirmationDialog