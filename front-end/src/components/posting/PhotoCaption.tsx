import React from 'react';
import { Grid, TextField } from '@material-ui/core';

interface PhotoCaptionProps {
  updateCaptionState: (e: any) => void;
}

export default function PhotoCaption(props: PhotoCaptionProps) {
  return (
    <Grid item xs={12} sm={12} style={{ marginBottom: '20px' }}>
      <Grid container justify='center'>
        <Grid item xs={12} sm={6}>
          <TextField
            type='text'
            placeholder='Enter a caption'
            fullWidth
            onChange={(e) => props.updateCaptionState(e.target.value)} />
        </Grid>
      </Grid>
    </Grid>
  )
}