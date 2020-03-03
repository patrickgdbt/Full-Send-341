import React from 'react';
import clsx from 'clsx';
import { Grid, Button, CircularProgress } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

interface PostButtonProps {
  onClick: () => void;
  disabled: boolean;
  loading: boolean;
  success: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      position: 'relative',
    },
    buttonSuccess: {
      backgroundColor: green[500],
      color: 'white',
      '&:hover': {
        backgroundColor: green[700],
      },
    },
    buttonProgress: {
      color: green[500],
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
  }),
);

export default function PostButton(props: PostButtonProps) {
  const classes = useStyles();
  const buttonClassname = clsx({
    [classes.buttonSuccess]: props.success,
  });

  return (
    <Grid item xs={12} sm={6} className={classes.wrapper}>
      <Button
        className={buttonClassname}
        variant='contained'
        onClick={props.onClick}
        disabled={props.disabled || props.loading}
        fullWidth
        endIcon={<CloudUploadIcon />}
      >
        Post Photo
      </Button>
      {props.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
    </Grid>
  )
}