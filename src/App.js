import { Component } from 'react';
import './App.css';
import AuthPage from './pages/AuthPage/AuthPage.jsx';
import CreatePage from './pages/CreatePage/CreatePage.jsx';
import EventsPage from './pages/EventsPage/EventsPage.jsx';
import { Route, Switch, Redirect } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <main className="App">
        <Switch>
          
          <Route path='/index' render={(props) => (
            <EventsPage {...props} />
          )}  /> 

          <Route path='/create' render={(props) => (
            <CreatePage {...props} />
          )}  />

          <Route path='/' render={(props) => (
            <AuthPage {...props} />
          )}  />

          

          {/* put the all encompassing route last */}

        </Switch>
      </main>
    )
  }
}