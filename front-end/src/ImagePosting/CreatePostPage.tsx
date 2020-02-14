import React from 'react';
import SelectPhoto from './SelectPhoto';
import PhotoCaption from './PhotoCaption';
import storage from './temp-firebase-config';

export default class CreatePostPage extends React.Component<any, any>{
    constructor(props: any){
        super(props);

        this.state = {
            image: null,
            displayImageURL: '',
            imageURL: '',
            caption: '',
        }

        this.updateImageStates = this.updateImageStates.bind(this);
        this.updateCaptionState = this.updateCaptionState.bind(this);
        this.fileUploadHandler = this.fileUploadHandler.bind(this);
    }

    updateCaptionState(cap: any){
        this.setState({caption: cap});
    }

    updateImageStates(file: any, fileURL: any){
        this.setState({
            image: file,
            displayImageURL: fileURL
        })
    }

    fileUploadHandler = () =>{
        const {image} = this.state;
        console.log(image);
        //const uploadTask = storage.ref('images/' + image.name).put(image);
        //uploadTask.on('state_changed', 
        //() => {
        //},
        //(error) => {
        //    console.log(error);
        //}, 
        //() => {
        //    storage.ref('images').child(image.name).getDownloadURL().then(url => {
        //        this.setState({imageURL: url});
        //    });
        //console.log('Image successfully uploaded to firebase');
        //});
    }

    render(){
        return (
            <div>
                <SelectPhoto updateImageStates = {this.updateImageStates} />
                <PhotoCaption updateCaptionState = {this.updateCaptionState}/>
                <button 
                 onClick = {this.fileUploadHandler}
                 disabled = {this.state.image != null ? false : true}>
                     Post Photo
                </button>
                <br />
                <img src = {this.state.displayImageURL} alt = {this.state.image == null ? '' : 'Unable to display your photo'} />
            </div>
        );
    }
}