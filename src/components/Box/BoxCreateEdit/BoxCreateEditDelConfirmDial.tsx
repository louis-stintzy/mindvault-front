import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

interface BoxCreateEditDelConfirmDialProps {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
  handleConfirmDelete: () => void;
}

function BoxCreateEditDelConfirmDial({
  openDialog,
  setOpenDialog,
  handleConfirmDelete,
}: BoxCreateEditDelConfirmDialProps) {
  return (
    <Dialog
      open={openDialog}
      onClose={() => setOpenDialog(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete this box ?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this box ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
        <Button onClick={handleConfirmDelete} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default BoxCreateEditDelConfirmDial;
