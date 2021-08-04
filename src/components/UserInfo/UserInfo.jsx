import React from 'react';
import { Link } from 'react-router-dom';
import './UserInfo.css'
import UserLogout from '../UserLogout/UserLogout';
import AllEvents from '../AllEvents/AllEvents'

const UserInfo = (props) => {
  return (
      <div>
<<<<<<< HEAD
        <Link className="btn" to='/index'>Home</Link>
=======
       <AllEvents />
>>>>>>> 575b94963afd7fec286512f8ef7ea922d7bbc22e
        <br/><br/>
        <UserLogout />
      </div>
  );
  }

export default UserInfo;
