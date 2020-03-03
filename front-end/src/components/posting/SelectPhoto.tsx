import React from 'react';
import { Grid, Button } from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

export default class SelectPhoto extends React.Component<any, any>{
  fileInput: any;

  constructor(props: any) {
    super(props);

    this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
  }

  fileSelectedHandler(e: any) {
    this.props.updateImageStates(e.target.files[0], URL.createObjectURL(e.target.files[0]));
  }

  render() {
    return (
      <Grid item xs={12} sm={12} style={{ marginBottom: '20px' }}>
        <Grid container justify='center'>
          <Grid item xs={12} sm={6}>
            <input
              type='file'
              onChange={this.fileSelectedHandler}
              accept='.png, .jpeg, .jpg'
              style={{ display: 'none' }}
              ref={fileInput => this.fileInput = fileInput} />
            <Button
              onClick={() => this.fileInput.click()}
              variant='contained'
              fullWidth
              endIcon={<PhotoCamera />}
            >Select a photo</Button>
            <br />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
