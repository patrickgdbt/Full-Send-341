import React from 'react';

export default class SelectPhoto extends React.Component<any, any>{
    fileInput: any;

    constructor(props: any){
        super(props);

        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
        this.fileUploadHandler = this.fileUploadHandler.bind(this);
    }

    fileSelectedHandler(e: any){
        this.props.updateImageState(URL.createObjectURL(e.target.files[0]));
    }

    fileUploadHandler = () =>{

    }

    render(){
        return(
            <div>
                <input 
                 type='file' 
                 onChange = {this.fileSelectedHandler}
                 accept = '.png, .jpeg, .jpg' 
                 style = {{display: 'none'}}
                 ref = {fileInput => this.fileInput = fileInput}/>
                <button onClick = {() => this.fileInput.click()}>Select a photo</button>
                <button 
                 onClick = {this.fileUploadHandler}
                 disabled = {this.fileInput != null ? false : true}>
                     Upload Photo
                </button>
                <br />
            </div>
        );
    }
}
