import { Component } from 'react';
import './App.css';
import AuthPage from './pages/AuthPage/AuthPage.jsx';
import CreatePage from './pages/CreatePage/CreatePage.jsx';
import EventsPage from './pages/EventsPage/EventsPage.jsx';
import { Route, Switch, Redirect } from 'react-router-dom';

export default class App extends Component {

  state = {
    user: null,
  }

  setUserInState = (incomingUserData) => {
    this.setState({ user: incomingUserData})
  }

  // get this when we check and decode token.
  //And then modify the render() method's return 
  // to conditionally render either the <AuthPage> or 
  // the actual functionality, based on if the user state is null or not

  render() {
    return (
      <main className="App">
        {this.state.user ? 
        <Switch>
          
          <Route path='/index' render={(props) => (
            <EventsPage {...props} />
          )}  /> 

          <Route path='/create' render={(props) => (
            <CreatePage {...props} />
          )}  />

          {/* <Route path='/' render={(props) => (
            <AuthPage {...props} />
          )}  /> */}
          
          <Redirect to="/index" />
          

          {/* put the all encompassing route last */}

        </Switch>
        : 
        <div>
          <AuthPage setUserInState={this.setUserInState} />
        </div>
        }
      </main>
    )
  }
}