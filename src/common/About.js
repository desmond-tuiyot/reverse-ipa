import React from "react";
import InfoIcon from "@material-ui/icons/Info";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const About = ({ iconClass }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleOpen} className={iconClass}>
        <InfoIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="about-modal-title"
        aria-describedby="about-modal-description"
      >
        <DialogTitle id="about-dialog-title">About Reverse IPA</DialogTitle>
        <DialogContent>
          <DialogContentText id="about-dialog-description">
            This is a tool to help language learners improve their
            pronunciation.
          </DialogContentText>
          <DialogContentText>
            You can use it to look up the IPA transcriptions of words.
            Alternatively, you search by IPA transcription to find words that
            contain certain sounds.
          </DialogContentText>
          <DialogContentText>
            If you have any feedback, DM me on twitter (linked above)
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default About;
