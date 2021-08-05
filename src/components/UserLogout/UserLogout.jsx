import React from 'react';
import './UserLogout.css'

class UserLogOut extends React.Component {

  handleLogout = () => {
    this.setState({ user: null });
    localStorage.clear();
    window.location.href = '/';
  }

  render() {
    return (
      <div className='UserLogOut'>
        <button onClick={this.handleLogout}>Logout</button>
      </div>
    );
  }
}

export default UserLogOut;