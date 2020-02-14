import React from 'react';
import CSS from 'csstype';

export default class UserInfo extends React.Component<InfoProps, InfoState>{
  constructor(props: any) {
    super(props);
    this.state = { username: "User Name", followerCount: 23, followingCount: 46 };
  }

  render() {
    return (
      <div>
        <table>
          <tr>
            <td colSpan={2}>Username: {this.state.username}</td>
          </tr>
          <tr>
            <td>
              Followers: {this.state.followerCount}
            </td>
            <td>
              Following: {this.state.followingCount}
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

interface InfoProps { }

interface InfoState {
  username: string,
  followerCount: number,
  followingCount: number
}