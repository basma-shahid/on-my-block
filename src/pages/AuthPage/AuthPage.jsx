import React, { Component } from "react";
import LogInForm from '../../components/LogInForm/LogInForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import Logo from '../../components/Logo/Logo';
import './AuthPage.css'

export default class AuthPage extends Component {

    state = {
        showLogin: true
    }


    render() {
        return (
            <div className="AuthPage">
                <div className="AuthPageLeft">
                    <h1 className="text" onClick={() => this.setState(
                        { showLogin: !this.state.showLogin }
                    )}>
                        {this.state.showLogin
                            ?
                            <>Don't have an account? <button>Register</button></>
                            :
                            <>Have an account? <button>Sign In</button></>
                        }</h1>
                </div>


            <div className="HiddenAuth">
            <h1 onClick={() => this.setState(
                { showLogin: !this.state.showLogin }
                )}>
            {this.state.showLogin 
            ? 
            <><h5>Don't have an account?</h5><button>Register</button></>
            :
            <><h5>Have an account?</h5> <button>Sign In</button></>
            }</h1>
            </div>
            

                <div className="AuthPageRight">
                    <Logo />
                    {this.state.showLogin
                        ?
                        <LogInForm setUserInState={this.props.setUserInState} />
                        :
                        <SignUpForm setUserInState={this.props.setUserInState} />
                    }
                </div>

                <div className="HiddenAuth">
                    <h1 onClick={() => this.setState(
                        { showLogin: !this.state.showLogin }
                    )}>
                        {this.state.showLogin
                            ?
                            <><h5>Don't have an account?</h5><span>Register</span></>
                            :
                            <><h5>Have an account?</h5> <span>Sign In</span></>
                        }</h1>
                </div>


                {/* <hr />
            Ater user is signed in: 
            <Link to='/index' >
                <button>View all events</button>
            </Link>

            <Link to='/create' >
                <button>Create an event</button>
            </Link> */}

            </div>
        )
    }
}