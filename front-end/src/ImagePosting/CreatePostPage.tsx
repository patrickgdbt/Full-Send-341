import React from 'react';
import SelectPhoto from './SelectPhoto';
import PhotoCaption from './PhotoCaption';

export default class CreatePostPage extends React.Component<any, any>{
    constructor(props: any){
        super(props);

        this.state = {
            image: null,
            caption: '',
        }

        this.updateImageState = this.updateImageState.bind(this);
        this.updateCaptionState = this.updateCaptionState.bind(this);
        this.fileUploadHandler = this.fileUploadHandler.bind(this);
    }

    updateCaptionState(cap: any){
        this.setState({caption: cap});
    }

    updateImageState(file: any){
        this.setState({image: file});
    }

    fileUploadHandler = () =>{

    }

    render(){
        return (
            <div>
                <SelectPhoto updateImageState = {this.updateImageState} />
                <PhotoCaption updateCaptionState = {this.updateCaptionState}/>
                <button 
                 onClick = {this.fileUploadHandler}
                 disabled = {this.state.image != null ? false : true}>
                     Upload Photo
                </button>
                <br />
                <img src = {this.state.image} alt = {this.state.image == null ? '' : 'Unable to display your photo'} />
            </div>
        );
    }
}