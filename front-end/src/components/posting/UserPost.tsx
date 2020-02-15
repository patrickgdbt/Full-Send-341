import React from 'react';
import FirebaseContext from '../../firebase/context';
import { FirebaseRequirements } from '../../interfaces/common';

export default class UserPost extends React.Component{
  constructor(props: any){
    super(props);

    this.state = {
      userName: '',
      imageURL: '',
      caption: '',
      commentCount: 0,
      comments: []
    }
  }

  updateState(postId: any){
    
  }

  render(){
    return (
      <div>

      </div>
    )
  }
}