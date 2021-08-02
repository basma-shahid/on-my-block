import React from 'react';
import { Link } from 'react-router-dom';
import './UserInfo.css'

const UserInfo = (props) => {
  return (
      <div>
        <Link className="btn" to='/index'>View Past Events</Link>
        <button>Logout</button>
      </div>
  );
  }

export default UserInfo;
