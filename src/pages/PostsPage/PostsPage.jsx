import React, { Component } from "react";
import { Link } from 'react-router-dom';
import UserLogout from '../../components/UserLogout/UserLogout';
import './PostsPage.css'

export default class PostsPage extends Component{

    render(){
    return (
        <div className="EventsPage">
            
            <div className="EventsPageLeft">

                <h1>Welcome, {this.props.user.name}!</h1>
                <br/><br/>
                <Link className="btn" to='/profile'>View Profile</Link><br/><br/>
                <UserLogout />
                

            </div>
            <div className="EventsPageRight">
            <Link className="btn" to='/posts'>Add Blog Post</Link><br/><br/>
                
            </div>
        </div>
    )
    }
}


