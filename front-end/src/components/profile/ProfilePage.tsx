import React from 'react';
import ProfilePosts from './ProfilePosts';
import UserInfo from './UserInfo';
import Header from '../landing/Header'

export default class ProfilePage extends React.Component<any, any>{
    render(){
        return(
            <div>
                <Header />
                <UserInfo id={this.props.match.params.id}/>
                <ProfilePosts id={this.props.match.params.id}/>
            </div>
        );
    }
}