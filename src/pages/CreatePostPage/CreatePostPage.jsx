import React, { Component } from "react";
import { Link } from 'react-router-dom';
import UserLogout from '../../components/UserLogout/UserLogout';
import PostForm from '../../components/PostForm/PostForm';



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
            <PostForm onSubmit={this.handleChange} />
                
            </div>
        </div>
    )
    }
}