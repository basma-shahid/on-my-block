import { Component } from 'react';

export default class SignUpForm extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        confirm: '',
        error: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            error: ''
        });
    }

    handleSignUp = async (e) => {
        e.preventDefault();
        try {
            // 1. POST our new user info to the server
            const fetchResponse = await fetch('/api/users/signup', {
              method: 'POST',
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify({name: this.state.name, email: this.state.email, password: this.state.password,})
            })
            
            // 2. Check "fetchResponse.ok". False means status code was 4xx from the server/controller action
            if (!fetchResponse.ok) throw new Error('Fetch failed - Bad request')
            
            let token = await fetchResponse.json() // 3. decode fetch response to get jwt from srv
            localStorage.setItem('token', token);  // 4. Stick token into localStorage
            
            const userDoc = JSON.parse(atob(token.split('.')[1])).user; // 5. Decode the token + put user document into state
            this.props.setUserInState(userDoc)
      
          } catch (err) {
              console.log("signup error", err)
              this.setState({error: 'signup failed. try again'});
          }
    }



    render(){
        const disable = this.state.password !== this.state.confirm;
        return(
            <div>
                <form>
                    
                        <input name="name" type="text" placeholder="Enter your name" value={this.state.name} onChange={this.handleChange}  />
                    
                        <input name="email" type="text" placeholder="Enter your email" value={this.state.email} onChange={this.handleChange}  />
                    
                        <input name="password" type="password" placeholder="Enter password" value={this.state.password} onChange={this.handleChange} />
                    
                        <input name="confirm" type="password" placeholder="Re-enter password" value={this.state.confirm} onChange={this.handleChange} />
                    
                    <br></br>
                    <button onClick={this.handleSignUp} disabled={disable} >Sign Up</button>
                </form>

                <p>{this.state.error}</p>
            </div>
        )
    }
}