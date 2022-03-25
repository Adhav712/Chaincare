import React, { useState }  from 'react';
import { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Preferences from './components/Preferences';
import Login from './components/Login';
import './App.css';
class App extends Component {
  render() {

    const [token, setToken] = useState();
    if(!token) {
      return <Login setToken={setToken} />
    }
    return (
      <div className="App">
        <div className="App-header">
          
          <h2>Welcome to React</h2>
          <BrowserRouter>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/preferences">
            <Preferences />
          </Route>
        </Switch>
      </BrowserRouter>
        </div>
        
      </div>
    );
  }
}

export default App;
