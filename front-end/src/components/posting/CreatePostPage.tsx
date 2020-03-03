import React from 'react';
import SelectPhoto from './SelectPhoto';
import PhotoCaption from './PhotoCaption';
import FirebaseContext from '../../firebase/context';
import { FirebaseRequirements, IPost, IComment } from '../../interfaces/common';
import { Grid } from '@material-ui/core';
import Post from '../feed/Post';
import PostButton from './PostButton';

interface CreatePostPageProps {
	close: () => void;
}

interface CreatePostPageState {
	image: any;
	displayImageURL: string;
	imageDownloadURL: string;
	caption: string;
	loading: boolean;
	success: boolean;
}

export default class CreatePostPage extends React.Component<CreatePostPageProps, CreatePostPageState>{
	constructor(props: CreatePostPageProps) {
		super(props);

		this.state = {
			image: null,
			displayImageURL: '',
			imageDownloadURL: '',
			caption: '',
			loading: false,
			success: false,
		}

		this.updateImageStates = this.updateImageStates.bind(this);
		this.updateCaptionState = this.updateCaptionState.bind(this);
		this.fileUploadHandler = this.fileUploadHandler.bind(this);
	}

	updateCaptionState(cap: string) {
		this.setState({ caption: cap });
	}

	updateImageStates(file: any, fileURL: string) {
		this.setState({
			image: file,
			displayImageURL: fileURL
		})
	}

	fileUploadHandler = () => {
		const uuidv4 = require('uuid/v4');
		const image = this.state.image;
		const app = this.context as FirebaseRequirements;
		const storage = app.storage;
		const db = app.db;
		const currentUser = app.auth.currentUser;
		const currentUserID = currentUser?.uid as string;
		const currentUserDisplayName = currentUser?.displayName as string;
		const imageID = uuidv4();

		this.setState({loading: true});

		storage.ref('images/' + imageID).put(image).then(
			() => {
				storage.ref('images').child(imageID).getDownloadURL().then(url => {
					this.setState({ imageDownloadURL: url });

					db.ref('posts')
						.push({
							imageURL: this.state.imageDownloadURL,
							userID: currentUserID,
							userName: currentUserDisplayName,
							caption: this.state.caption,
							commentCount: 0,
						})
						.then((snap) => {
							db.ref('users').child(currentUserID).child('posts')
							.push(snap.key)
							.then(noUse => {
								this.setState({
									loading: false,
									success: true
								});
								setTimeout(this.props.close, 300);
							});
						});
				});
			});
	}

	render() {
		const app = this.context as FirebaseRequirements;

		const postData = {
			imageURL: this.state.displayImageURL,
			caption: this.state.caption,
			userName: app.auth.currentUser?.displayName,
			comments: [] as IComment[],
		} as IPost;

		const disabled = this.state.image == null || this.state.caption === '';

		return (
			<Grid container justify='center' style={{ textAlign: 'center', padding: '20px', overflow: 'auto' }}>
				<SelectPhoto updateImageStates={this.updateImageStates} />
				<Post postData={postData} preview/>
				<PhotoCaption updateCaptionState={this.updateCaptionState} />
				<PostButton onClick={this.fileUploadHandler} disabled={disabled} loading={this.state.loading} success={this.state.success} />
			</Grid>
		);
	}
}
CreatePostPage.contextType = FirebaseContext;