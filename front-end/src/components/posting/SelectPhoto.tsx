import React from 'react';

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
      <div>
        <input
          type='file'
          onChange={this.fileSelectedHandler}
          accept='.png, .jpeg, .jpg'
          style={{ display: 'none' }}
          ref={fileInput => this.fileInput = fileInput} />
        <button onClick={() => this.fileInput.click()}>Select a photo</button>
        <br />
      </div>
    );
  }
}
