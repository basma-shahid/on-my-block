import './ProfilePage.css';
import React from 'react';
import UserInfo from '../../components/UserInfo/UserInfo';
import PostDetails from '../../components/PostDetails/PostDetails';


export default class ProfilePage extends React.Component {

  render() {
    return (
      <main className="profile">
        <nav>
        <UserInfo />
        </nav>
        <div className="card">
        <h2>Name: {this.props.user.name}</h2>
        </div> 
        <br/>
        <div className="card">
        <h2>Email: {this.props.user.email}</h2>
        </div>
        <br/><br/>
        <h3>Past Posts Created:</h3>
        <PostDetails user={this.props.user} />
        <div></div>
      </main>

    )
  }
}