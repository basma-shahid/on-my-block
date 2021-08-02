import { Component } from 'react';
import './LogInForm.css';

export default class LoginForm extends Component {

    state = {
        email: '',
        password: '',
        error: ''
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            error: ''
        });
    }

    handleRegister = () => {
        alert("bring up sign up form")
    }


    render(){
        return(
            <div>
                <form>
                
                    <input name="email" placeholder="Enter your email" type="text" value={this.state.email} onChange={this.handleChange}  />
                    <input name="password" placeholder="Enter your password" type="text" value={this.state.password} onChange={this.handleChange} />
                    <button>Sign In</button>
                </form>

                
            </div>

        )
    }
}