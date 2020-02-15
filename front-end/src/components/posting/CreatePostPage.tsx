import React from 'react';
import SelectPhoto from './SelectPhoto';
import PhotoCaption from './PhotoCaption';
import FirebaseContext from '../../firebase/context';
import { FirebaseRequirements } from '../../interfaces/common';

export default class CreatePostPage extends React.Component<any, any>{
	constructor(props: any) {
		super(props);

		this.state = {
			image: null,
			displayImageURL: '',
			imageDownloadURL: '',
			caption: '',
		}

		this.updateImageStates = this.updateImageStates.bind(this);
		this.updateCaptionState = this.updateCaptionState.bind(this);
		this.fileUploadHandler = this.fileUploadHandler.bind(this);
	}

	updateCaptionState(cap: any) {
		this.setState({ caption: cap });
	}

	updateImageStates(file: any, fileURL: any) {
		this.setState({
			image: file,
			displayImageURL: fileURL
		})
	}

	fileUploadHandler = () => {
		const { image } = this.state;
		console.log(image);
		const app = this.context as FirebaseRequirements;
		const storage = app.storage;
		const db = app.db;
		const currentUser = app.auth.currentUser;
		const currentUserID = currentUser?.uid as string;
		const currentUserDisplayName = currentUser?.displayName as string;

		storage.ref('images/' + image.name).put(image).then(
			() => {
				storage.ref('images').child(image.name).getDownloadURL().then(url => {
					this.setState({ imageDownloadURL: url });
				});

				db.ref('posts')
					.push({
						imageURL: this.state.displayImageURL,
						userID: currentUserID,
						userName: currentUserDisplayName,
						caption: this.state.caption,
						commentCount: 0,
					})
					.then((snap) => {
						db.ref('users').child(currentUserID).child('posts').push(snap.key);
					});
			});
	}

	render() {
		return (
			<div>
				<SelectPhoto updateImageStates={this.updateImageStates} />
				<PhotoCaption updateCaptionState={this.updateCaptionState} />
				<button
					onClick={this.fileUploadHandler}
					disabled={this.state.image != null ? false : true}>
					Post Photo
        </button>
				<br />
				<img src={this.state.displayImageURL} alt={this.state.image == null ? '' : 'Unable to display your photo'} />
			</div>
		);
	}
}
CreatePostPage.contextType = FirebaseContext;