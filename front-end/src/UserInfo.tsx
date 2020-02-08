import React from 'react';

export default class UserInfo extends React.Component{
    render(){
        return(
                    <table>
                        <tr>
                            <td colSpan={2}><UserName/></td>
                        </tr>
                        <tr>
                            <td>
                                <Followers/>
                            </td>
                            <td>
                                <Following/>
                            </td>
                        </tr>
                    </table>
        );
    }
}

class UserName extends React.Component{
    name = "User Name";
    render(){
        return(
        <div>User Name: {this.name}</div>
        );
    }
}

class Followers extends React.Component{
    followerCount = 23;
    render(){
        return(
            <div>Followers: {this.followerCount}</div>
        );
    }
}

class Following extends React.Component{
    followingCount = 46;
    render(){
        return(
            <div>Following: {this.followingCount}</div>
        );
    }
}