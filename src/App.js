import { Component } from 'react';
import './App.css';
import AuthPage from './pages/AuthPage/AuthPage.jsx';
import PostsPage from './pages/PostsPage/PostsPage.jsx';
import ProfilePage from './pages/ProfilePage/ProfilePage.jsx';
import CreatePostPage from './pages/CreatePostPage/CreatePostPage.jsx';
import { Route, Switch, Redirect } from 'react-router-dom';

export default class App extends Component {

  state = {
    user: null,
  }

  setUserInState = (incomingUserData) => {
    this.setState({ user: incomingUserData })
  }

  componentDidMount() {
    let token = localStorage.getItem('token')
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1])); // decode token
      if (payload.exp < Date.now() / 1000) {  // Check if our token is expired, and remove if it is (standard/boilerplate)
        localStorage.removeItem('token');
        token = null;
      } else { // token not expired! our user is still 'logged in'. Put them into state.
        let userDoc = payload.user // grab user details from token
        this.setState({user: userDoc})      
      }
    }
  }

  render() {
    return (
      <main className="App">
        {this.state.user ?
          <Switch>

            <Route path='/index' render={(props) => (
              <PostsPage {...props} user={this.state.user} />
            )} />
            <Route path='/profile' render={(props) => (
              <ProfilePage {...props} user={this.state.user} />
            )} />
            
            <Route path='/posts' render={(props) => (
              <CreatePostPage {...props} user={this.state.user} />
            )} />

            <Redirect to="/index" />

          </Switch>
          :

          <AuthPage setUserInState={this.setUserInState} />
        }
      </main>
    )
  }
}