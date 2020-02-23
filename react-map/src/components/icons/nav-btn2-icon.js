import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import {RemoveCity} from '../APIfunction'


export default function SvgMaterialIcons(props) {
  const [open, setOpen] = React.useState(false);
  const [info, setInfo] = React.useState(`Remove ${props.data} from favorites list?`);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemove = async () => {
    setInfo(`Removing ${props.data} from favorites list...`);
    await RemoveCity(props.data, props.user);
    setOpen(false);
  };
  
  const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        display: 'flex',
      },
    },
    iconStyle: {
      position: 'absolute',
      bottom: '20%',
      left: '80%',
      '&:hover': {
        color: 'red',
      },
    },

  }));
  const classes = useStyles();

  return (
    <div>
    <CancelIcon className={classes.iconStyle} onClick={handleClickOpen}/>
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{info}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={handleRemove} color="primary" autoFocus>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
    </div>
  )
}