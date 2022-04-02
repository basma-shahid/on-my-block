import React, { Component } from "react";
import Delete from '../Delete/Delete'
import { Route, Switch, Redirect } from 'react-router-dom';
import ReactImageUploading from "react-images-uploading";


export default class PostDetails extends Component{
    

    state = {
        posts: []
    }

    getUserPosts = async () => {
        try{
            let jwt = localStorage.getItem('token')
            let fetchPostsResponse = await fetch("/api", {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + jwt
                }
            })
            let allPosts = await fetchPostsResponse.json();
            console.log("this is the user's post", allPosts)
            this.setState({posts: allPosts})
        }catch(err){
            console.log('error', err)
        }
    }

    getOnePost = async (id) => {
        
        try{
            let jwt = localStorage.getItem('token')
            let fetchPostsResponse = await fetch(`/api/${id}`
            , {
                method: 'DELETE', 
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + jwt
                }
            })
            let newPostList = await fetchPostsResponse.json();
            console.log("this is new list", newPostList)
            this.setState({posts: newPostList}) 
    } catch (err) {
        console.log("this is one error", err);
    }
    
}

    newPostList = async () => {
        try{
            let jwt = localStorage.getItem('token')
            let fetchPostsResponse = await fetch("/api/posts", {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + jwt
                }
            })
            let newPosts = await fetchPostsResponse.json();
            console.log("this is the user's post", newPosts)
            this.setState({posts: newPosts})
        }catch(err){
            console.log('error', err)
        }
    }


    componentDidMount() {
        this.getUserPosts()
    }

   render(){
    return (
        <div>
            {this.state.posts.length ?

            this.state.posts.map(post =>

    <table class="cards-table">
    <thead>
        <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Categories</th>
            <th>Created By</th>
            <th>Delete</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>{post.title} </td>
            <td>{post.description} </td>
            <td>{post.categories} </td>
            <td>{post.firstname} </td>
            <td><Delete id={post._id} getOnePost={this.getOnePost} /></td>
        </tr>
        </tbody>
    </table>
                
                ) :
                'There are no previous posts' }
        </div>
    )
   }
}

