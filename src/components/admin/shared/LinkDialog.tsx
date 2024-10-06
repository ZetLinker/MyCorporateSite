// LinkDialog.tsx

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

type LinkDialogProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (url: string) => void;
  initialUrl?: string;
};

const LinkDialog: React.FC<LinkDialogProps> = ({
  open,
  onClose,
  onSubmit,
  initialUrl = "",
}) => {
  const [url, setUrl] = useState(initialUrl);

  const handleSubmit = () => {
    onSubmit(url);
    setUrl("");
  };

  const handleClose = () => {
    onClose();
    setUrl("");
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>リンクの挿入</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="リンクのURL"
          type="url"
          fullWidth
          variant="outlined"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>キャンセル</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          挿入
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LinkDialog;
