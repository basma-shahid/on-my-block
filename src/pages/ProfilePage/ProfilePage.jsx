import './ProfilePage.css';
import React from 'react';
import UserInfo from '../../components/UserInfo/UserInfo';
import EventDetails from '../../components/EventDetails/EventDetails';


export default class ProfilePage extends React.Component {

  render() {
    return (
      <main className="profile">
        <nav>
        <UserInfo />
        </nav>
        <h2>Name: {this.props.user.name}</h2> <br/>
        <h2>Email: {this.props.user.email}</h2>
        <br/><br/>
        <h3>Past Events Created:</h3>
        <EventDetails user={this.props.user} />
        <div></div>
      </main>

    )
  }
}