import React from 'react';
import { Link } from 'react-router-dom';
import './UserInfo.css'
import UserLogout from '../UserLogout/UserLogout';

const UserInfo = (props) => {
  return (
      <div id="container">
        <Link className="btnlink" to='/index'>Home</Link>
        <br/><br/>
        <UserLogout />
      </div>
  );
  }

export default UserInfo;
