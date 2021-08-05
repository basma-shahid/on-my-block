import React from 'react';
import { Link } from 'react-router-dom';
import './UserInfo.css'
import UserLogout from '../UserLogout/UserLogout';

const UserInfo = (props) => {
  return (
      <div>
        <Link className="btn" to='/index'>Home</Link>
        <br/><br/>
        <UserLogout />
      </div>
  );
  }

export default UserInfo;
