import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CreateIcon from "@mui/icons-material/Create";
import SendIcon from "@mui/icons-material/Send";

export default function CreateDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" startIcon={<CreateIcon />} onClick={handleClickOpen}>
        작성
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>새 메모</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" id="name" label="제목" type="email" fullWidth variant="standard" />
          <TextField id="outlined-multiline-static" label="내용" multiline rows={4} fullWidth margin="dense" />
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" startIcon={<SendIcon />} onClick={handleClose}>
            제출
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
