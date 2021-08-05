import React from 'react';
import { Link } from 'react-router-dom';
import './UserInfo.css'
import UserLogout from '../UserLogout/UserLogout';

const UserInfo = (props) => {
  return (
      <li id="container">
        <Link className="btnlink" to='/index'>Home</Link>
        <br/><br/>
        <UserLogout />
      </li>
  );
  }

export default UserInfo;
