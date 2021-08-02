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




    render(){
        return(
            <div>
                <form>
                    
                        <input name="name" type="text" placeholder="Enter your name" value={this.state.name} onChange={this.handleChange}  />
                    
                        <input name="email" type="text" placeholder="Enter your email" value={this.state.email} onChange={this.handleChange}  />
                    
                        <input name="password" type="text" placeholder="Enter password" value={this.state.password} onChange={this.handleChange} />
                    
                        <input name="confirm" type="text" placeholder="Re-enter password" value={this.state.confirm} onChange={this.handleChange} />
                    
                    <button>Sign Up</button>
                </form>

                
            </div>
        )
    }
}