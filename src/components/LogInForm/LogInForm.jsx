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

    handleSignIn = async (evt) => {
        evt.preventDefault();
        try {
            // 1. POST our new user info to the server
            const fetchResponse = await fetch('/api/users/login', {
              method: 'POST',
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: this.state.email, password: this.state.password, })
            })
      
            // 2. Check "fetchResponse.ok". False means status code was 4xx from the server/controller action
            if (!fetchResponse.ok) throw new Error('Fetch failed - Bad request')
      
            let token = await fetchResponse.json() // 3. decode fetch response: get jwt token from srv
            localStorage.setItem('token', token);  // 4. Stick token into localStorage
      
            const userDoc = JSON.parse(atob(token.split('.')[1])).user; // 5. Decode the token + put user document into state
            this.props.setUserInState(userDoc)
      
          } catch (err) {
              console.log("signup error", err)
              this.setState({error: 'oops, login failed. try again'});
          }      
    }


    render(){
        return(
            <div>
                <form>
                
                    <input name="email" placeholder="Enter your email" type="text" value={this.state.email} onChange={this.handleChange}  />
                    <input name="password" placeholder="Enter your password" type="text" value={this.state.password} onChange={this.handleChange} />
                    <button onClick={this.handleSignIn } >Sign In</button>
                </form>
                <p>{this.state.error}</p>

                
            </div>

        )
    }
}