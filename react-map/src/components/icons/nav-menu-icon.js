import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DoubleArrowOutlinedIcon from '@material-ui/icons/DoubleArrowOutlined';

export default function CloseIcon() {
  const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        display: 'flex',
      },
    },
    iconStyle: {
      height: '40px',
      width: '40px',
      '&:hover': {
        opacity: '0.6',
      },
    },

  }));
  const classes = useStyles();

  return (
    <DoubleArrowOutlinedIcon  className={classes.iconStyle} /> 
  )
  }