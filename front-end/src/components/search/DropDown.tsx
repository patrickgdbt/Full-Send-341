import React from 'react';
import FirebaseContext from '../../firebase/context';
import { FirebaseRequirements, IBasicUser } from '../../interfaces/common';
import SearchResult from './SearchResult';

interface DropDownProps {
  criteria: string;
  showDrop: boolean;
}

interface DropDownState {
  users: IBasicUser[];
}

export default class DropDown extends React.Component<DropDownProps, DropDownState> {
  constructor(props: any) {
    super(props);

    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    const app = this.context as FirebaseRequirements;
    const users = this.state.users;

    app.db.ref('users').once('value', (snapshot) => {
      snapshot.forEach(child => {
        users.push({
          userName: child.val().displayName,
          userID: child.key as string,
        });
      });

      this.setState({
        users: users,
      });
    });
  }

  render() {
    const criteria = this.props.criteria.toLowerCase();
    const queryResult = criteria === '' ? [] : this.state.users.filter((userInfo) => {
      return userInfo.userName.toLowerCase().includes(criteria);
    });

    return (
      <div
        role='presentation'
        style={{
          position: 'absolute',
          backgroundColor: 'white',
          boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
          width: '100%',
        }}
      >
        {queryResult.map((userInfo, i) => <SearchResult key={i} userInfo={userInfo} />)}
      </div>
    );
  }
}
DropDown.contextType = FirebaseContext;