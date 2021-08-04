import './ProfilePage.css';
import React from 'react';
import UserInfo from '../../components/UserInfo/UserInfo';

export default class ProfilePage extends React.Component {

  render() {
    return (
      <main className="profile">
        <h2>Name: {this.props.user.name}</h2> <br/>
        <h2>Email: {this.props.user.email}</h2>
        <br/><br/>
        <UserInfo />
        <div></div>
      </main>
    )
  }
}