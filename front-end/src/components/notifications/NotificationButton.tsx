import React from 'react';
import { IconButton, Badge, Drawer, List, ListItem, ListItemText, Divider } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import FirebaseContext from '../../firebase/context';
import { FirebaseRequirements, NoProps, INotification } from '../../interfaces/common';
import Notification from './Notification';

interface NotificationsButtonState {
  open: boolean;
  newNotifs: number;
  notifs: INotification[];
}

export default class NotificationsButton extends React.Component<NoProps, NotificationsButtonState> {
  constructor(props: NoProps) {
    super(props);

    this.state = {
      open: false,
      newNotifs: 0,
      notifs: [],
    };

    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
  }

  componentDidMount() {
    const app = this.context as FirebaseRequirements;

    app.auth.onAuthStateChanged(user => {
      app.db.ref('users/' + app.auth.currentUser?.uid + '/newNotifs')
        .on('value', snapshot => {
          this.setState({
            newNotifs: snapshot.val(),
          });
        });

      app.db.ref('users/' + app.auth.currentUser?.uid + '/notifs')
        .on('child_added', snapshot => {
          const notifs = this.state.notifs;
          notifs.push(snapshot.val());
          this.setState({
            notifs: notifs,
          });
        });

      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    const app = this.context as FirebaseRequirements;

    app.db.ref('users/' + app.auth.currentUser?.uid + '/newNotifs').off();
    app.db.ref('users/' + app.auth.currentUser?.uid + '/notifs').off();
  }

  openDrawer() {
    const app = this.context as FirebaseRequirements;

    if (this.state.newNotifs !== 0) {
      app.db.ref('users/' + app.auth.currentUser?.uid + '/newNotifs').set(0);
    }

    this.setState({
      open: true,
    });
  }

  closeDrawer() {
    this.setState({
      open: false,
    });
  }

  render() {
    return (
      <div>
        <IconButton aria-label="notifications" color="inherit" onClick={this.openDrawer}>
          <Badge badgeContent={this.state.newNotifs} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Drawer anchor='right' open={this.state.open} onClose={this.closeDrawer}>
          <div
            style={{ width: '250px' }}
            role='presentation'
          >
            <List style={{ padding: '0px' }}>
              <ListItem style={{ textAlign: 'center' }}>
                <ListItemText primary='Notifications' />
              </ListItem>
            </List>
            <Divider />
            <List style={{ padding: '0px' }}>
              {this.state.notifs.map((n: INotification, i: number, arr: INotification[]) => <Notification key={i} notifData={arr[arr.length - i - 1]} />)}
            </List>
          </div>
        </Drawer>
      </div>
    )
  }
}
NotificationsButton.contextType = FirebaseContext;