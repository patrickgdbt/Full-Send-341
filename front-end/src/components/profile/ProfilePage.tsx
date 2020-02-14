import React from 'react';
import ProfilePosts from './ProfilePosts';
import UserInfo from './UserInfo';

export default class ProfilePage extends React.Component{
    render(){
        return(
            <div>
                <UserInfo/>
                <ProfilePosts/>
            </div>
        );
    }
}