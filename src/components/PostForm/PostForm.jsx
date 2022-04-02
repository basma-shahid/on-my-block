import { Component } from 'react';
import PostDetails from '../PostDetails/PostDetails'
import './PostForm.css'


export default class PostForm extends Component {


    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            categories: "",
            firstname: "",
            website: "",
        };
    }
    

    addPost = async (e) => {
        e.preventDefault();
        //this is to stop refresh. e has to be added to parameter
        try {
            let jwt = localStorage.getItem('token')
            let fetchResponse = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + jwt
                },
                body: JSON.stringify({
                    title: this.state.title,
                    description: this.state.description,
                    categories: this.state.categories,
                    firstname: this.state.firstname,
                    website: this.state.website
                })
                // send the body object to server

            })
            let serverResponse = await fetchResponse.json()
            this.props.updatePost({
                title: this.state.title,
                description: this.state.description,
                categories: this.state.categories,
                firstname: this.state.firstname,
                website: this.state.website
            });
            // if the post was sent over without errors, set state to empty
            this.setState({
                title: "",
                description: "",
                categories: "",
                firstname: "",
                website: ""
            })
        } catch (err) {
            console.error("Error:", err)
        }
    }

    handleChange = e => {
        console.log(e.target.checkValidity());
        this.setState({
            [e.target.name]: e.target.value
            // this is referring to name in the input element not name in state
        })
    }


    render() {
        return(
               <div>
                   <form className="postForm">
                       <input className="title-form" placeholder="enter your title here" type="text" name="title" value={this.state.title} onChange={this.handleChange} />
                       <br></br>
                       <input className="description-form" placeholder="enter your Artist Statement here" type="text" name="description" value={this.state.description} onChange={this.handleChange} />
                       <br></br>
                       <input  className="name-form" placeholder="enter your Name here" type="text" name="firstname" value={this.state.firstname} onChange={this.handleChange} />
                       <br></br>
                       <input className="website-form" placeholder="enter your website here" type="text" name="website" value={this.state.website} onChange={this.handleChange} />
                       <br></br>
                       <button onClick={this.addPost}>Add Post</button>
                   </form>
                   <PostDetails />
               </div>
        )
    }
}