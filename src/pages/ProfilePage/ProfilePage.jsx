import './ProfilePage.css';
import React from 'react';
import { Link } from 'react-router-dom';
import UserInfo from '../../components/UserInfo/UserInfo';

export default class ProfilePage extends React.Component {

  render() {
    return (
      <main>
        Name: {this.props.user.name} <br/>
        Email: {this.props.user.email}
        <UserInfo />
        <div></div>
      </main>
    )
  }
}