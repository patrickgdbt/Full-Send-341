import React from 'react';
import ProfilePosts from './ProfilePosts';
import UserInfo from './UserInfo';

export default class ProfilePage extends React.Component<any, any>{
	render() {
		return (
			<div style={{ paddingTop: '48px' }}>
				<UserInfo id={this.props.match.params.id} />
				<ProfilePosts id={this.props.match.params.id} />
			</div>
		);
	}
}