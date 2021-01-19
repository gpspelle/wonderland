import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import './App.css';

import Login from './components/Login';
import Home from './components/Home';
import Logout from './components/Logout';

function App() {
  const [token, setToken] = useState();

  if(!token) {
    return <Login setToken={setToken} />
  };

  return (

    <BrowserRouter>
      <Switch>
        <Route render={() => <Redirect to={{pathname: "/"}} />} />
      </Switch>
      <Home />
      <br />
      <Logout setToken={setToken}/>
    </BrowserRouter>
  );
}

export default App;