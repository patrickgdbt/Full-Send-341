import React from 'react';

export default class PhotoCaption extends React.Component<any, any>{
    constructor(props: any){
        super(props);

        this.handleCaptionChange = this.handleCaptionChange.bind(this);
    }

    handleCaptionChange(e: any){
        this.props.updateCaptionState(e.target.value);
    }

    render(){
        return(
            <input 
             type = 'text' 
             maxLength = {300}
             placeholder = "Caption"
             onChange = {this.handleCaptionChange}/>
        )
    }
}