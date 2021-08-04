import React from 'react';
import { Link } from 'react-router-dom';
import './UserInfo.css'
import UserLogout from '../UserLogout/UserLogout';
import AllEvents from '../AllEvents/AllEvents'

const UserInfo = (props) => {
  return (
      <div>
       <AllEvents />
        <br/><br/>
        <UserLogout />
      </div>
  );
  }

export default UserInfo;
